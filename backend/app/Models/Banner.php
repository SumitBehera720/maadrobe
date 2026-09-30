<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'tag',
        'image_path',
        'cta_text',
        'cta_link',
        'view_path',
        'ordering',
        'is_active',
    ];

    protected $casts = [
        'ordering' => 'integer',
        'is_active' => 'boolean',
    ];
}
