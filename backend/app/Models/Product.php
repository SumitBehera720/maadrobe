<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'price',
        'original_price',
        'tag',
        'description',
        'short_description',
        'sku',
        'stock',
        'is_active',
        'is_featured',
        'is_new_arrival',
        'ordering',
        'rating',
        'review_count',
        'fabric_details',
        'shipping_details',
        'exchange_details',
        'enable_fabric_details',
        'enable_shipping_details',
        'enable_exchange_details',
        'size_guide_image',
    ];

    protected $casts = [
        'price' => 'double',
        'original_price' => 'double',
        'stock' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_new_arrival' => 'boolean',
        'enable_fabric_details' => 'boolean',
        'enable_shipping_details' => 'boolean',
        'enable_exchange_details' => 'boolean',
        'ordering' => 'integer',
        'rating' => 'double',
        'review_count' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('ordering', 'asc');
    }

    public function sizes(): HasMany
    {
        return $this->hasMany(ProductSize::class);
    }

    public function colors(): HasMany
    {
        return $this->hasMany(ProductColor::class);
    }
}
