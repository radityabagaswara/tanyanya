<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TanyaController extends Controller
{
    public function index(Request $request, $user)
    {
        $page = Pages::where('username', $user)->with(["user" => function ($query) {
            $query->select('id', 'name', 'profile_photo_path');
        }])->with('socialLinks')->first();

        return Inertia::render("Tanya", [
            "page" => $page,
        ]);
    }

}
