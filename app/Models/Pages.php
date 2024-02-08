<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'bio',
        'is_accepting_question',
        "allow_anon_question",
        'users_id',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function socialLinks()
    {
        return $this->hasMany(SocialLinks::class, 'pages_id', 'id');
    }

}
