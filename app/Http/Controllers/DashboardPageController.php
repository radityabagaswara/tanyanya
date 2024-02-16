<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use App\Models\SocialLinks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardPageController extends Controller
{

    public function show(Request $request)
    {
        if (!Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->route('dashboard.page.create');
        }

        $page = Pages::where('users_id', $request->user()->id)->with("user")->with('socialLinks')->first();

        return Inertia::render('Dashboard/Pages/Show', [
            'page' => $page,
        ]);
    }

    public function create(Request $request)
    {
        if (Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->route('dashboard')->withErrors(['error' => 'You have reached the maximum number of pages allowed.']);
        }

        return Inertia::render('Dashboard/Pages/Create');
    }

    public function insert(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'min:5', 'max:10', 'regex:/^[a-zA-Z0-9]+$/'],
        ], [
            'username.regex' => 'The username may only contain letters and numbers.',
        ]);

        if (Pages::where('username', $request->username)->first()) {
            return redirect()->back()->withErrors(['username' => 'This username is already taken.']);
        }

        if (Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->back()->withErrors(['error' => 'You have reached the maximum number of pages allowed.']);
        }

        $page = new Pages();
        $page->username = $request->username;
        $page->users_id = $request->user()->id;
        $page->bio = "Ask me anything!";
        $page->save();

        return redirect()->route('dashboard');
    }

    public function update(Request $request)
    {

        //check if user has the page
        $page = Pages::where('users_id', $request->user()->id)->first();

        if (!$page) {
            return redirect()->route('dashboard.page.create')->withErrors(['error' => 'You do not have a page.']);
        }

        $request->validate([
            'username' => ['required', 'string', 'min:5', 'max:10', 'regex:/^[a-zA-Z0-9]+$/'],
            'bio' => 'nullable|string|max:160',
            'is_accepting_question' => 'boolean',
            'allow_anon_question' => 'boolean',
            'social_links' => 'array',
            'social_links.*.name' => 'string',
            'header' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'price_per_unit' => 'required|numeric|min:1000|max:100000',
            //check social link if it is a valid url for supported social media platforms
            'social_links.*.url' => [
                'url',
                function ($attribute, $value, $fail) {
                    $url = trim($value);
                    $pattern = '/^(?:https?:\/\/)?(?:www\.)?([^\/\?]+)/i';
                    preg_match($pattern, $url, $matches);
                    $host = isset($matches[1]) ? $matches[1] : null;

                    $allowedDomains = [
                        'youtube.com',
                        'youtu.be',
                        'twitter.com',
                        'twitch.tv',
                        'discord.com',
                        'discord.gg',
                        'instagram.com',
                    ];
                    if (!$host || !in_array($host, $allowedDomains)) {
                        $fail("$value is not a valid URL for supported social media platforms.");
                    }
                },
            ],
        ], [
            'username.regex' => 'The username may only contain letters and numbers.',
            'bio.max' => 'The bio may not be greater than 160 characters.',
            'header.max' => 'The header image may not be greater than 2MB.',
            'header.mimes' => 'The header image must be a file of type: jpeg, png, jpg.',
            'price_per_unit.min' => 'The price per unit must be at least Rp 1.000.',
            'price_per_unit.max' => 'The price per unit may not be greater than Rp 100.000.',
        ]);

        if ($page->username != $request->username) {
            if (Pages::where('username', $request->username)->first()) {
                return redirect()->back()->withErrors(['username' => 'This username is already taken.']);
            }
        }

        $page->username = $request->username;
        $page->bio = $request->bio;
        $page->is_accepting_question = $request->is_accepting_question;
        $page->allow_anon_question = $request->allow_anon_question;
        $page->price_per_unit = $request->price_per_unit;

        //check if user input a header image and save it
        if ($request->hasFile('header')) {
            $file = $request->file('header');
            $file_name = $page->username . "_" . time() . "." . $file->getClientOriginalExtension();
            $file_path = "tanyanya/pages/banners";
            Storage::putFileAs($file_path, $file, $file_name);

            //delete the old banner
            if ($page->header) {
                Storage::delete($file_path . "/" . $page->header);
            }

            $page->header = $file_name;
        }

        $page->save();

        //if there is social links, then save it
        if ($request->social_links) {
            SocialLinks::where('pages_id', $page->id)->delete();

            foreach ($request->social_links as $social_link) {
                //insert
                $page->socialLinks()->create([
                    'name' => $social_link['name'],
                    'url' => $social_link['url'],
                ]);
            }
        }
        return Redirect::back()->with('success', ['title' => 'Page Updated', 'message' => 'Your page has been updated.']);
    }
}
