<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['keyword'] ?? false) {
            $keyword = "%{$filters['keyword']}%";
            $query->where('title', 'like', $keyword)
                ->orWhere('author', 'like', $keyword)
                ->orWhere('publisher', 'like', $keyword)
                ->orWhere('description', 'like', $keyword);
        }
    }
}
