<?php

namespace App\Policies;

use App\Models\Targets;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TargetsPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Targets $targets): Response
    {
        return Response::allow();

    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        if ($user->pages()->count() > 0) {
            return Response::allow();
        } else {
            return Response::deny('You must have a page to create a target');
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Targets $targets): Response
    {
        if ($user->id === $targets->pages->users_id) {
            return Response::allow();
        } else {
            return Response::deny('You are not authorized to update this target');
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Targets $targets): Response
    {
        return Response::deny('Target can\'t be deleted!');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Targets $targets): Response
    {
        return Response::deny('Target can\'t be deleted!');

    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Targets $targets): Response
    {
        return Response::deny('Target can\'t be deleted!');

    }
}
