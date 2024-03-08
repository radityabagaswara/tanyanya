<?php

namespace App\Http\Controllers;

use App\Models\Donations;
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

    public function get_recent_dono(Request $request, $page_id)
    {
        $donations = Donations::where('pages_id', $page_id)
            ->select('amount', 'price', 'id', 'transaction_status', 'transaction_time', 'message', 'is_anon', 'users_id')
            ->where(function ($query) {
                $query->where('transaction_status', 'capture')
                    ->orWhere('transaction_status', 'settlement');
            })
            ->orderBy("id", "desc")->paginate(15);

        foreach ($donations as $item) {
            if ($item['is_anon'] == 1) {
                $item['users'] = null;
            } else {
                $item['users'] = $item['users']->only(['id', 'name']);
            }
        }

        return response()->json($donations);

    }

}
