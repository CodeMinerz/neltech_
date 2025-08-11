<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
           'username',
            'password',
            'fullname',
            'f_name',
            'l_name',
            'phone_no',
            'b_date',
            'active',
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    protected function getFullnameAttribute(): string
    {
        return $this->f_name . ' ' . $this->l_name;
    }
    protected function setLNameAttribute($value): void
    {
        $this->attributes['l_name'] = $value;
    }
    protected function setFNameAttribute($value): void
    {
        $this->attributes['f_name'] = $value;
    }
    public static function searchable(): array
    {
        return [
            'username',
            'fullname',
        ];
    }
    public function toggleActive(): bool
    {
        return $this->active = !$this->active ?? $this->active;
    }
}

