<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTargetsRequest;
use App\Http\Requests\UpdateTargetsRequest;
use App\Models\Pages;
use App\Models\Targets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TargetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $pageId = Pages::where('users_id', $user->id)->value('id');
        $query = Targets::where('pages_id', $pageId);

        if ($request->has('q')) {
            $search = $request->input('q');
            $query->where('name', 'like', "%$search%");
        }

        if ($request->has('is_active')) {
            $isActive = $request->input('is_active');
            if ($isActive == "active") {
                $query->where('is_active', true);
            } else {
                $query->where('is_active', false);
            }
        }

        $targets = $query->paginate($request->rows ?? 10);

        return response()->json($targets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //check if user has a page
        if (!Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->route('dashboard');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTargetsRequest $request)
    {
        if (!Pages::where('users_id', $request->user()->id)->first()) {
            return redirect()->route('dashboard');
        }

        DB::beginTransaction();

        try {
            Targets::create([
                'name' => $request->name,
                'description' => $request->description,
                'amount' => $request->amount,
                'current' => 0,
                'is_active' => $request->is_active,
                'is_achieved' => false,
                'pages_id' => Pages::where('users_id', $request->user()->id)->first()->id,
            ]);
            DB::commit();
            return Redirect::back()->with('success', ['title' => 'Target Created!', 'message' => "Target $request->name has been created."]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['error' => 'Failed to create target.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Targets $target)
    {
        if ($target->pages->users_id != Auth::id()) {
            return Redirect::back()->withErrors(['error' => 'You are not authorized to view this page.']);
        }

        $target->load(['donations', 'donations.users']);

        return Inertia::render('Dashboard/Donation/Goals/ShowGoals');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Targets $targets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTargetsRequest $request, Targets $targets)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Targets $targets)
    {
        //
    }
}
