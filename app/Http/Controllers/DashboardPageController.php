<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use App\Models\SocialLinks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardPageController extends Controller
{

    public function show(Request $request)
    {
        if (!Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->route('dashboard.page.create');
        }

        $page = Pages::where('users_id', $request->user()->id)->with("user")->with('socialLinks')->first();
        $page->update([
            'bio' => "Hello, ask me anything!",
        ]);

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
        $page->save();

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
