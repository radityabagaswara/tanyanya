<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Storage;

class AppendPageBannerURL implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $builder->addSelect([
            'header_url' => "CASE
                WHEN {$model->getTable()}.header IS NOT NULL THEN CONCAT('" . Storage::url("tanyanya/pages/banners/") . "', {$model->getTable()}.header)
                ELSE 'https://placehold.co/726x180?text=Header' END",
        ]);
    }
}
