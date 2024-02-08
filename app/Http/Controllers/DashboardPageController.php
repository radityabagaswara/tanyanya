<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardPageController extends Controller
{

    public function show(Request $request)
    {
        if (!Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->route('dashboard.page.create');
        }

        return Inertia::render('Dashboard/Pages/Show');
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
}
