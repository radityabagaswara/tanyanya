<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pages extends Model
{
    use HasFactory;

    protected $fillable = [
        'header',
        'username',
        'bio',
        'is_accepting_question',
        "allow_anon_question",
        'users_id',
        'price_per_unit',

    ];

    protected $appends = ['header_url'];

    public function getHeaderURLAttribute()
    {
        if ($this->header) {
            return Storage::url("tanyanya/pages/banners/") . $this->header;
        }

        // Generate a default profile photo URL using the user's name
        return 'https://placehold.co/600x400?text=Header';
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function socialLinks()
    {
        return $this->hasMany(SocialLinks::class, 'pages_id', 'id');
    }

    public function donations()
    {
        return $this->hasMany(Donations::class, 'pages_id', 'id');
    }

}
