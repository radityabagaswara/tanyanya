<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * @return string
     */
    public function getProfilePhotoUrlAttribute()
    {

        $config = [
            'default' => $this->defaultProfilePhotoUrl(),
            'size' => '200', // use 200px by 200px image
        ];

        return 'https://www.gravatar.com/avatar/' . md5($this->name) . '?' . http_build_query($config);
    }

    /**
     * @return string
     */
    public function defaultProfilePhotoUrl()
    {
        return 'https://ui-avatars.com/api/' . implode('/', [

            //IMPORTANT: Do not change this order
            urlencode($this->name), // name
            200, // image size
            'FEEEF3', // background color
            'F5487F', // font color
        ]);
    }

    public function pages()
    {
        return $this->hasMany(Pages::class, 'users_id', 'id');
    }
}
