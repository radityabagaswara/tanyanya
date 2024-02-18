<?php

namespace App\Http\Controllers;

use App\Models\Donations;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardDonationController extends Controller
{

    public function index()
    {
        DB::enableQueryLog();
        $user = auth()->user();
        $page = $user->pages->first();
        $donation = Donations::where('pages_id', $page->id)
            ->with(["users" => function ($query) {
                $query->select('id', 'name', 'profile_photo_path');
            }])->get();
        dd(DB::getQueryLog());

        return Inertia::render('Dashboard/Donation/DonationDashboard', [
            'donation' => $donation,
        ]);
    }
}
