<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Storage;

class AppendUserPhotoURL implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $builder->addSelect([
            "CASE
                WHEN {$model->getTable()}.profile_photo_path IS NOT NULL THEN CONCAT('" . Storage::url("tanyanya/profile/") . "', {$model->getTable()}.profile_photo_path)
                ELSE CONCAT('https://ui-avatars.com/api/', MD5(SUBSTRING({$model->getTable()}.name, 1, 1)), '?d=mp') END",
            'profile_photo_url']
        );
    }
}
