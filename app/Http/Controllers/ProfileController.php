<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{

    public function update(Request $request)
    {
        $user = User::find(auth()->user()->id)->first();

        if (!$user) {
            return Redirect::back()->withErrors(['error' => 'There was an error while updating your profile. Please try again later!']);
        }

        $request->validate([
            "name" => ["required", "string", "min:5", "max:50"],
            "email" => ["required", 'email'],
            'birth_date' => ['required', 'date', 'date_format:Y-m-d'],
            "photo" => ['image', 'nullable', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);

        $file_name = null;

        if ($request->photo) {
            $file = $request->file('photo');
            $file_name = $user->name . "_" . time() . "." . $file->getClientOriginalExtension();
            $file_path = "tanyanya/profile/";
            Storage::putFileAs($file_path, $file, $file_name);
        }

        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->birth_date = $request->get('birth_date');
        $user->profile_photo_path = $file_name;
        $user->save();

        return Redirect::back()->with('success', ['title' => "Profile Updated", "message" => "Your profile was sucessfully saved!"]);
    }
}
