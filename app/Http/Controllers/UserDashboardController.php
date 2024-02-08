<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {

        //check if user has pages
        $is_page = Pages::where('users_id', auth()->user()->id)->first();
        return Inertia::render('Dashboard/index', [
            'is_page' => $is_page,
        ]);
    }
}
