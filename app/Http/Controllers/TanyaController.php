<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

    public function insert(Request $request, $page)
    {

        if ($page || $page->is_accepting_question === false) {
            return Redirect::back()->withErrors(['error' => 'You are not allowed to submit a question to this page!']);
        }

        if (auth()->user()) {
            return Redirect::back()->withErrors(['error' => 'You are not allowed to submit an anonymous question to this page!']);
        }

        $request->validate([
            'question' => ['required', 'string', 'min:5', 'max:300'],
            'is_anon' => ['required', 'boolean'],
        ], [
            'question.required' => 'Please enter your question!',
            'question.min' => 'Your question is too short! Please enter a question with at least 5 characters!',
            'question.max' => 'Your question is too long!',
        ]);

        $page->questions()->create([
            'question' => $request->get('question'),
            'is_anon' => $request->get('is_anon'),
            'user_id' => auth()->user() ? auth()->user()->id : null,
        ]);

        return redirect()->back()->with('success', ['title' => 'Question Submitted', 'message' => 'Your question was submitted successfully!']);
    }
}
