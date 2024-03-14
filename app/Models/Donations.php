<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donations extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'answer',
        'is_anon',
        'amount',
        'transaction_status',
        'transaction_time',
        'transaction_id',
        'payment_id',
        'pages_id',
        'users_id',
        'snap_token',
        'price',
        'targets_id',
    ];

    public function pages()
    {
        return $this->belongsTo(Pages::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function targets()
    {
        return $this->belongsTo(Targets::class);
    }
}
