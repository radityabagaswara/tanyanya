<?php

namespace App\Http\Controllers;

use App\Models\Donations;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardDonationController extends Controller
{

    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Dashboard/Donation/DonationDashboard', [
        ]);
    }

    public function getDataAPI(Request $request)
    {
        $user = auth()->user();
        $page = $user->pages->first();
        if (!$page) {
            return response(404)->json([
                'message' => 'Page not found.',
            ]);
        }

        $donation = Donations::where('pages_id', $page->id)
            ->select('ammount', 'price', 'id', 'transaction_status', 'transaction_time', 'message', 'is_anon', 'users_id')
            ->where(function ($query) {
                $query->where('transaction_status', 'capture')
                    ->orWhere('transaction_status', 'settlement');
            })->whereHas('users', function ($query) use ($request) {
            if ($request->query('search')) {
                $query->where('name', 'like', '%' . $request->query('search') . '%');
            }
        })
            ->with(["users" => function ($query) use ($request) {
                $query->select('id', 'name');
            }])->paginate($request->query('rows'));

        $donation->getCollection()->map(function ($item) {
            if ($item->is_anon) {
                $item->users = null;
            }
            return $item;
        });

        return response()->json($donation);
    }
}
