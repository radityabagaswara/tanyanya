<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Targets extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'amount',
        'current',
        'is_active',
        'is_achived',
        'pages_id',
    ];

    protected $cast = [
        'is_active' => 'boolean',
        'is_achived' => 'boolean',
    ];

    public function pages()
    {
        return $this->belongsTo(Pages::class);
    }

    public function donations()
    {
        return $this->hasMany(Donations::class);
    }
}
