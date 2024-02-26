<?php

namespace App\Http\Controllers;

use App\Models\Donations;
use App\Models\Pages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Midtrans\Notification;

class DonationController extends Controller
{
    public function __construct()
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.serverKey');
        \Midtrans\Config::$isProduction = config('services.midtrans.isProduction');
        \Midtrans\Config::$isSanitized = config('services.midtrans.isSanitized');
        \Midtrans\Config::$is3ds = config('services.midtrans.is3ds');
    }

    public function newDono(Request $request, Pages $page)
    {

        $request->validate(
            [
                'ammount' => 'required|numeric|min:1',
                'message' => 'nullable|string',
                'is_anon' => 'boolean',
            ], [
                'ammount.min' => 'The minimum donation unit is 1.',
                'ammount.required' => 'The ammount field is required.',
            ]
        );

        // check if page is accepting donations
        if (!$page->is_accepting_dono) {
            return redirect()->back()->withErrors(['error' => 'This page is not accepting donations.']);
        }

        $transaction_id = "donation-" . time() . "-" . $request->user()->name;
        $total_price = (int) $request->ammount * $page->price_per_unit;

        $payload = [
            'transaction_details' => [
                'order_id' => $transaction_id,
                'gross_amount' => $total_price,
            ],
            [
                'customer_details' => [
                    'first_name' => $request->user()->name,
                    'email' => $request->user()->email,
                ],
            ],
            'item_details' => [
                [
                    'id' => $page->id,
                    'price' => $page->price_per_unit,
                    'quantity' => $request->ammount,
                    'name' => "Donation to " . $page->username . " #" . $page->id,
                ],
            ],
        ];

        $snap_token = \Midtrans\Snap::getSnapToken($payload);
        $page->donations()->create([
            'message' => $request->message,
            'ammount' => $request->ammount,
            'is_anon' => $request->is_anon,
            'transaction_id' => $transaction_id,
            'payment_id' => null,
            'transaction_status' => "pending",
            'transaction_time' => null,
            'users_id' => $request->user()->id,
            'snap_token' => $snap_token,
            'price' => $total_price,
        ]);

        return Redirect::back()->with("snap_token", $snap_token);
    }

    public function handleNotif()
    {
        $notif = new Notification();
        $transaction_id = $notif->transaction_id;
        $transaction_status = $notif->transaction_status;
        $transaction_time = $notif->transaction_time;
        $order_id = $notif->order_id;

        $donation = Donations::where('transaction_id', $order_id)->first();

        if (!$donation) {
            return response()->json(['status' => 'error', 'message' => 'Donation not found.'], 404);
        }

        if ($transaction_status === 'pending') { //payment processing
            $donation->update([
                'transaction_status' => "pending",
            ]);

        } else if ($transaction_status == 'capture' || $transaction_status == 'settlement') { //Payment accepted
            $donation->update([
                'transaction_status' => "capture",
                'transaction_time' => $transaction_time,
                'payment_id' => $transaction_id,
            ]);

        } else if ($transaction_status === 'expire') {
            $donation->update([
                'transaction_status' => "expire",
            ]);

        } else if ($transaction_status === 'cancel' || $transaction_status === 'deny' || $transaction_status === 'failure') {
            $donation->update([
                'transaction_status' => "failed",
            ]);
        } else {
            $donation->update([
                'transaction_status' => $transaction_status,
            ]);
        }

        return response()->json(['status' => 'success', 'message' => 'Notification received.']);

    }
}
