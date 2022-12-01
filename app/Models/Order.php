<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function scopeFilter($query, array $filters)
    {
        if ($filters['keyword'] ?? false) {
            $keyword = "%{$filters['keyword']}%";
            $query->whereHas('book', function ($query) use ($keyword) {
                $query->where('title', 'like', $keyword)
                    ->orWhere('author', 'like', $keyword)
                    ->orWhere('publisher', 'like', $keyword)
                    ->orWhere('description', 'like', $keyword);
            })->orWhereHas('user', function ($query) use ($keyword) {
                $query->where('name', 'like', $keyword)
                    ->orWhere('username', 'like', $keyword)
                    ->orWhere('identity', 'like', $keyword);
            });
        }
    }
}
