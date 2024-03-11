<?php

namespace App\Http\Controllers;

use App\Models\Donations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardDonationController extends Controller
{

    public function index()
    {
        $user = auth()->user();

        $total_donation = Cache::remember('total_donation' . $user->id, 3600, function () use ($user) {
            return Donations::where('users_id', $user->id)
                ->where(function ($query) {
                    $query->where('transaction_status', 'capture')
                        ->orWhere('transaction_status', 'settlement');
                })->sum('price');
        });

        $total_donation_this_month = Cache::remember('total_donation_month' . $user->id, 3600, function () use ($user) {
            return Donations::where('users_id', $user->id)
                ->where(function ($query) {
                    $query->where('transaction_status', 'capture')
                        ->orWhere('transaction_status', 'settlement');
                })
                ->whereYear('transaction_time', '=', date('Y'))
                ->whereMonth('transaction_time', '=', date('m'))
                ->sum('price');
        });

        $most_active_donator = Cache::remember('most_active_donator' . $user->id, 3600, function () use ($user) {
            return Donations::where('users_id', $user->id)
                ->where(function ($query) {
                    $query->where('transaction_status', 'capture')
                        ->orWhere('transaction_status', 'settlement');
                })
                ->where('is_anon', 0)
                ->with('users')
                ->groupBy('users_id')
                ->select('users_id', DB::raw('count(*) as total'))->orderBy('total', 'desc')->first();
        });

        //store ttl 60 min
        Cache::put('total_donation' . $user->id . ':ttl', 3600);

        return Inertia::render('Dashboard/Donation/DonationDashboard', [
            'total_donation' => (int) $total_donation,
            'total_donation_this_month' => (int) $total_donation_this_month,
            'most_active_donator' => $most_active_donator,
            'cache_refresh_in' => time() + Cache::get('total_donation' . $user->id . ':ttl'),
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
            ->select('amount', 'price', 'id', 'transaction_status', 'transaction_time', 'message', 'is_anon', 'users_id')
            ->where(function ($query) {
                $query->where('transaction_status', 'capture')
                    ->orWhere('transaction_status', 'settlement');
            })->with(["users" => function ($query) use ($request) {
            $query->select('id', 'name');
        }]);

        if ($request->query('users')) {
            //name
            $donation->whereHas('users', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->query('users') . '%');
            });
        }

        if ($request->query('transaction_time') && count($request->query('transaction_time')) == 2 &&
            $request->query('transaction_time')[0] && $request->query('transaction_time')[1]) {
            $donation->whereBetween('transaction_time', $request->query('transaction_time'));
        }

        $donation = $donation->paginate($request->query('rows'));

        $donation->getCollection()->map(function ($item) {
            if ($item->is_anon) {
                $item->users = null;
            }
            return $item;
        });

        return response()->json($donation);
    }
}
