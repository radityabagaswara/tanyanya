<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use Illuminate\Http\Request;

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
                'is_anon' => 'required|boolean',
            ], [
                'ammount.min' => 'The minimum donation unit is 1.',
                'ammount.required' => 'The ammount field is required.',
            ]
        );

        //check if page is accepting donations
        if (!$page->is_accepting_question) {
            return redirect()->back()->withErrors(['error' => 'This page is not accepting donations.']);
        }

        $transaction_id = "donation-" . time() . "-" . $request->user()->name;
        $total_price = $request->ammount * $page->price_per_unit;

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

    }
}
