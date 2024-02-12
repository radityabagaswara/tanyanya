<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserSettingsController extends Controller
{
    //

    public function index(Request $request)
    {

        $page = Pages::where('users_id', $request->user()->id)->with("user")->with('socialLinks')->first();
        $user = User::find(auth()->user()->id)->first(['name', 'email', 'birth_date']);
        return Inertia::render('Dashboard/Settings', [
            'page' => $page,
            'user' => $user,
        ]);
    }
}
