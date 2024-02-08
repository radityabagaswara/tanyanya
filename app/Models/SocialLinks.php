<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLinks extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
    ];

    public function page()
    {
        return $this->belongsTo(Pages::class, 'pages_id');
    }
}
