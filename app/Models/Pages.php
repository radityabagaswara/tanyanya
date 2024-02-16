<?php

namespace App\Models;

use App\Models\Scopes\AppendPageBannerURL;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::addGlobalScope(new AppendPageBannerURL);
    }

    protected $fillable = [
        'header',
        'username',
        'bio',
        'is_accepting_question',
        "allow_anon_question",
        'users_id',
        'price_per_unit',

    ];

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
