<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\ProductColor;
use App\Models\Banner;
use App\Models\HomepageCms;
use App\Models\Setting;
use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Users
        User::create([
            'name' => 'MaaDrobe Admin',
            'email' => 'admin@maadrobe.com',
            'password' => Hash::make('Qubnix123@'),
            'role' => 'super_admin',
            'phone' => '+91 98765 43210',
        ]);

        User::create([
            'name' => 'Priya Sen',
            'email' => 'priya@example.com',
            'password' => Hash::make('password123'),
            'role' => 'customer',
            'phone' => '+91 98765 98765',
        ]);

        // 2. Seed Categories
        $catCoords = Category::create([
            'name' => 'Co-ord Sets',
            'slug' => 'coords',
            'description' => 'Matching tunic and trouser sets tailored in organic cottons and pure linens.',
            'image_path' => '/images/maadrobe_casual.png',
            'is_active' => true,
            'ordering' => 1,
        ]);

        $catKurtis = Category::create([
            'name' => 'Kurti Collection',
            'slug' => 'kurti',
            'description' => 'Traditional Chikankari, elegant Anarkalis, and premium 3-Piece Kurta sets.',
            'image_path' => '/images/maadrobe_festive.png',
            'is_active' => true,
            'ordering' => 2,
        ]);

        $catDresses = Category::create([
            'name' => 'Dresses',
            'slug' => 'dresses',
            'description' => 'Flowy tiered midi dresses and keyhole-neck silhouettes.',
            'image_path' => '/images/maadrobe_chikankari.png',
            'is_active' => true,
            'ordering' => 3,
        ]);

        // Helper lists to map subCategory to category_id
        $catMap = [
            'festive' => $catKurtis->id,
            'chikankari' => $catKurtis->id,
            'daily' => $catKurtis->id,
            'kurti' => $catKurtis->id,
            'coords' => $catCoords->id,
            'dresses' => $catDresses->id,
        ];

        // 3. Seed Products (15 Mock items from App.jsx)
        $rawProducts = [
            [
                'id' => 1,
                'name' => 'Gulnar Blockprinted Silk Anarkali Set',
                'price' => 3499,
                'originalPrice' => 4999,
                'tag' => 'BEST SELLER',
                'category' => 'Anarkali Suits',
                'subCategory' => 'festive',
                'description' => 'Exquisite handblock printed pure silk Anarkali set featuring a voluminous flared silhouette, styled with a gold-bordered matching dupatta and pants. Perfect for traditional celebrations.',
                'image' => '/images/maadrobe_festive.png',
                'rating' => 4.9,
                'reviewCount' => 73,
                'thumbnails' => ['/images/maadrobe_festive.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_casual.png']
            ],
            [
                'id' => 2,
                'name' => 'Zoya Hand-Embroidered Cotton Chikankari Kurta',
                'price' => 1899,
                'originalPrice' => 2499,
                'tag' => 'NEW ARRIVAL',
                'category' => 'Chikankari Kurtis',
                'subCategory' => 'chikankari',
                'description' => 'Beautiful pastel peach cotton Kurta hand-embroidered by Lucknowi artisans with traditional shadow work Chikankari. Light, breathable, and elegant for both daytime events and evening gatherings.',
                'image' => '/images/maadrobe_chikankari.png',
                'rating' => 4.8,
                'reviewCount' => 41,
                'thumbnails' => ['/images/maadrobe_chikankari.png', '/images/maadrobe_casual.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 3,
                'name' => 'Nila Kashida Georgette Anarkali Gown',
                'price' => 3999,
                'originalPrice' => 5499,
                'tag' => 'ROYAL LUXURY',
                'category' => 'Anarkali Suits',
                'subCategory' => 'festive',
                'description' => 'Flowy georgette Anarkali gown in royal indigo blue, detailed with exquisite Kashida-style floral embroidery along the neckline and hem. Comes with premium silk lining and matching solid leggings.',
                'image' => '/images/maadrobe_festive.png',
                'rating' => 4.9,
                'reviewCount' => 28,
                'thumbnails' => ['/images/maadrobe_festive.png', '/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png']
            ],
            [
                'id' => 4,
                'name' => 'Roop Banarasi Silk Straight Kurti',
                'price' => 2299,
                'originalPrice' => 2999,
                'tag' => 'ROYAL DROP',
                'category' => 'Festive Collection',
                'subCategory' => 'festive',
                'description' => 'Crafted from fine Banarasi silk, this straight-cut Kurta features classic gold brocade (zari) bootis and a rich golden-threaded border. Pairs beautifully with gold tissue palazzo pants.',
                'image' => '/images/maadrobe_festive.png',
                'rating' => 4.7,
                'reviewCount' => 19,
                'thumbnails' => ['/images/maadrobe_festive.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_casual.png']
            ],
            [
                'id' => 5,
                'name' => 'Mehreen Lakhnavi Chikankari Georgette Kurta',
                'price' => 2199,
                'originalPrice' => 2799,
                'tag' => 'POPULAR',
                'category' => 'Chikankari Kurtis',
                'subCategory' => 'chikankari',
                'description' => 'Premium georgette Kurta in refreshing mint green, decorated with intricate Lakhnavi Chikankari embroidery. Styled with mirror-work highlights on the cuffs and neck for a festive touch.',
                'image' => '/images/maadrobe_chikankari.png',
                'rating' => 4.8,
                'reviewCount' => 33,
                'thumbnails' => ['/images/maadrobe_chikankari.png', '/images/maadrobe_casual.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 6,
                'name' => 'Avani Handloom Cotton A-Line Kurta',
                'price' => 1299,
                'originalPrice' => 1799,
                'tag' => 'DAILY COMFORT',
                'category' => 'Daily Wear',
                'subCategory' => 'daily',
                'description' => 'Made from pure handloom cotton in deep mustard gold, this A-line everyday Kurta features blockprinted panels, wooden buttons, and a functional side pocket. Ideal for long office hours.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.6,
                'reviewCount' => 22,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 7,
                'name' => 'Tara Indigo Printed Short Cotton Kurti',
                'price' => 999,
                'originalPrice' => 1399,
                'tag' => 'BEST VALUE',
                'category' => 'Daily Wear',
                'subCategory' => 'daily',
                'description' => 'Traditional Bagru block printed short cotton kurti in indigo blue. Designed with a clean Chinese collar and roll-up sleeves. Perfect to pair with jeans or palazzos.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.7,
                'reviewCount' => 54,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 8,
                'name' => 'Meera Pastel Linen Straight Kurta',
                'price' => 1599,
                'originalPrice' => 2199,
                'tag' => 'OFFICE ESSENTIAL',
                'category' => 'Daily Wear',
                'subCategory' => 'daily',
                'description' => 'Sophisticated straight-cut Kurta crafted from breathable linen in lilac purple, featuring fine pintuck details and elegant mother-of-pearl buttons. Subtle, premium, and durable.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.5,
                'reviewCount' => 16,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 9,
                'name' => 'Kiara Floral Handblock Short Kurti',
                'price' => 1199,
                'originalPrice' => 1699,
                'tag' => 'NEW DROP',
                'category' => 'Daily Wear',
                'subCategory' => 'daily',
                'description' => 'A cheerful pastel yellow short Kurti made of soft organic cotton, printed with vibrant handblock floral patterns. Features a relaxed fit with elegant bell sleeves.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.7,
                'reviewCount' => 25,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 10,
                'name' => 'Rania Royal Silk 3-Piece Kurta Set',
                'price' => 4599,
                'originalPrice' => 5999,
                'tag' => 'MAADROBE SPECIAL',
                'category' => '3-Piece Kurti',
                'subCategory' => 'kurti',
                'description' => 'Stunning silk 3-piece set comprising a rich straight Kurti with detailed zari neckline, matching solid pants, and an organza dupatta with gold laces. Exudes pure royal charm.',
                'image' => '/images/maadrobe_festive.png',
                'rating' => 4.9,
                'reviewCount' => 12,
                'thumbnails' => ['/images/maadrobe_festive.png', '/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png']
            ],
            [
                'id' => 11,
                'name' => 'Aarya Embroidered Chanderi 3-Piece Set',
                'price' => 4299,
                'originalPrice' => 5499,
                'tag' => 'ROYAL ELEGANCE',
                'category' => '3-Piece Kurti',
                'subCategory' => 'kurti',
                'description' => 'Crafted in breathable Chanderi silk, this set features delicate hand-done katha work and sequin details, paired with straight pants and a designer scalloped dupatta.',
                'image' => '/images/maadrobe_festive.png',
                'rating' => 4.8,
                'reviewCount' => 8,
                'thumbnails' => ['/images/maadrobe_festive.png', '/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png']
            ],
            [
                'id' => 12,
                'name' => 'Miraan Cotton Floral Co-ord Set',
                'price' => 1999,
                'originalPrice' => 2799,
                'tag' => 'TRENDING',
                'category' => 'Co-ord Sets',
                'subCategory' => 'coords',
                'description' => 'Stylishly tailored matching tunic and trouser co-ord set in pure premium cotton. Features vibrant floral prints, a sophisticated collar, and comfortable utility side pockets.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.8,
                'reviewCount' => 37,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 13,
                'name' => 'Sia Linen Comfort Casual Co-ord Set',
                'price' => 2199,
                'originalPrice' => 2999,
                'tag' => 'DAILY WEAR',
                'category' => 'Co-ord Sets',
                'subCategory' => 'coords',
                'description' => 'Ultra-comfortable solid co-ord set made in pure handwoven linen. Styled with button-down front tunic and tapered trousers. Breathable, minimalist, and smart.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.7,
                'reviewCount' => 22,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 14,
                'name' => 'Dhara Handblock Flared Tiered Dress',
                'price' => 2499,
                'originalPrice' => 3499,
                'tag' => 'NEW LAUNCH',
                'category' => 'Dresses',
                'subCategory' => 'dresses',
                'description' => 'Flowy, tiered silhouette midi dress featuring authentic handblock Indigo block printing. Crafted in premium high-density cotton with adjustable waist ties.',
                'image' => '/images/maadrobe_chikankari.png',
                'rating' => 4.9,
                'reviewCount' => 19,
                'thumbnails' => ['/images/maadrobe_chikankari.png', '/images/maadrobe_casual.png', '/images/maadrobe_festive.png']
            ],
            [
                'id' => 15,
                'name' => 'Nia Indigo Cotton Indo-Western Dress',
                'price' => 1899,
                'originalPrice' => 2499,
                'tag' => 'EASY CHIC',
                'category' => 'Dresses',
                'subCategory' => 'dresses',
                'description' => 'Fusion dress with keyhole neck details and tiered asymmetric hemline. Perfect blend of Indian handblock motifs and modern western style.',
                'image' => '/images/maadrobe_casual.png',
                'rating' => 4.7,
                'reviewCount' => 15,
                'thumbnails' => ['/images/maadrobe_casual.png', '/images/maadrobe_chikankari.png', '/images/maadrobe_festive.png']
            ]
        ];

        foreach ($rawProducts as $idx => $rp) {
            $prod = Product::create([
                'name' => $rp['name'],
                'slug' => Str::slug($rp['name']),
                'category_id' => $catMap[$rp['subCategory']] ?? $catKurtis->id,
                'price' => $rp['price'],
                'original_price' => $rp['originalPrice'],
                'tag' => $rp['tag'],
                'description' => $rp['description'] ?? 'Premium handcrafted apparel.',
                'short_description' => substr($rp['description'] ?? 'Premium handcrafted apparel.', 0, 80) . '...',
                'sku' => 'MD-' . str_pad($rp['id'], 4, '0', STR_PAD_LEFT),
                'stock' => rand(15, 60),
                'is_active' => true,
                'is_featured' => $rp['id'] <= 5,
                'is_new_arrival' => in_array($rp['id'], [2, 9, 14]),
                'ordering' => $idx + 1,
                'rating' => $rp['rating'],
                'review_count' => $rp['reviewCount'],
            ]);

            // Add sizes
            foreach (['XS', 'S', 'M', 'L', 'XL', 'XXL'] as $size) {
                ProductSize::create([
                    'product_id' => $prod->id,
                    'size' => $size
                ]);
            }

            // Add colors
            foreach (['Pastel Peach', 'Mint Green', 'Royal Indigo', 'Mustard Gold'] as $color) {
                ProductColor::create([
                    'product_id' => $prod->id,
                    'color' => $color
                ]);
            }

            // Add main image and thumbnails
            ProductImage::create([
                'product_id' => $prod->id,
                'image_path' => $rp['image'],
                'is_thumbnail' => true,
                'ordering' => 0,
            ]);

            foreach ($rp['thumbnails'] as $tIdx => $thumb) {
                if ($thumb !== $rp['image']) {
                    ProductImage::create([
                        'product_id' => $prod->id,
                        'image_path' => $thumb,
                        'is_thumbnail' => false,
                        'ordering' => $tIdx + 1,
                    ]);
                }
            }
        }

        // 4. Seed Banners (Slides from App.jsx)
        Banner::create([
            'tag' => 'ROYAL LUXURY',
            'title' => "Chikankari Crafted\nto Perfection.",
            'subtitle' => 'Hand-embroidered Lucknowi Kurtas made from pure fabrics, tailored for your grace.',
            'image_path' => '/images/maadrobe_hero_chikankari.png',
            'cta_text' => 'Shop Chikankari',
            'cta_link' => '#',
            'view_path' => 'chikankari',
            'ordering' => 1,
            'is_active' => true,
        ]);

        Banner::create([
            'tag' => 'FESTIVE EXCLUSIVES',
            'title' => 'Celebrate in Timeless Elegance.',
            'subtitle' => 'Rich Banarasi silks and flared Anarkalis designed to shine at every grand occasion.',
            'image_path' => '/images/maadrobe_hero_festive.png',
            'cta_text' => 'Shop Festive Wear',
            'cta_link' => '#',
            'view_path' => 'festive',
            'ordering' => 2,
            'is_active' => true,
        ]);

        Banner::create([
            'tag' => 'BESPOKE STITCHING',
            'title' => "Your Perfect Fit,\nDirectly from Artisans.",
            'subtitle' => 'Customize your neckline, sleeves, and fit. Made-to-measure tailoring delivered to your doorstep.',
            'image_path' => '/images/maadrobe_hero_casual.png',
            'cta_text' => 'Bespoke Fitting',
            'cta_link' => '#',
            'view_path' => 'tailoring',
            'ordering' => 3,
            'is_active' => true,
        ]);

        // 5. Seed Homepage CMS
        $cms = [
            'heritage_tagline' => 'OUR HERITAGE',
            'heritage_title' => "Crafting India's Heritage",
            'heritage_intro' => "At MaaDrobe, we bridge the gap between traditional Indian weaver craftsmanship and modern fashion style.",
            'story_collage_main' => '/images/maadrobe_festive.png',
            'story_collage_sub' => '/images/maadrobe_chikankari.png',
            'story_badge_value' => '100%',
            'story_badge_label' => 'Handcrafted',
            'pillar_1_title' => '100% Pure Organic Fabrics',
            'pillar_1_desc' => 'Each piece is cut from handpicked pure fabrics, including premium silk, handloom cotton, and georgettes.',
            'pillar_2_title' => 'Authentic Chikankari Shadow-work',
            'pillar_2_desc' => 'Hand-embroidery created by specialized clusters of artisans in Lucknow and Rajasthan.',
            'pillar_3_title' => 'WhatsApp Bespoke Tailoring',
            'pillar_3_desc' => 'Silhouettes custom adjusted to your height and measurements for the perfect tailored fit.',
        ];

        foreach ($cms as $key => $val) {
            HomepageCms::create(['key' => $key, 'value' => $val]);
        }

        // 6. Seed Site Settings
        $settings = [
            'site_name' => 'MaaDrobe',
            'site_logo' => '/images/ICON-01.png',
            'contact_number' => '+91 98765 43210',
            'contact_email' => 'contact@maadrobe.com',
            'whatsapp_number' => '919876543210',
            'instagram_url' => 'https://instagram.com',
            'facebook_url' => 'https://facebook.com',
            'youtube_url' => 'https://youtube.com',
            'footer_text' => 'Premium handcrafted Indian ethnic clothing. Tailored to perfection, made using 100% pure organic fabrics. Designed to suit every silhouette.',
            'shipping_info' => 'Free express shipping across India. Standard orders are dispatched within 24-48 hours and delivered in 3-5 business days.',
            'return_policy' => 'We offer easy returns and size exchanges within 7 days of delivery. Custom-stitched or bespoke items are non-returnable but eligible for free alteration adjustments.',
            'terms_conditions' => 'All products are handcrafted by artisans; slight variations in print, weave, and embroidery are signatures of authenticity. Direct orders placed via WhatsApp are subject to manual validation.',
        ];

        foreach ($settings as $key => $val) {
            Setting::create(['key' => $key, 'value' => $val]);
        }

        // 7. Seed Sample Coupons
        Coupon::create([
            'code' => 'WELCOME10',
            'type' => 'percentage',
            'value' => 10.00,
            'min_order_amount' => 1000.00,
            'max_discount' => 500.00,
            'expiry_date' => now()->addDays(90),
            'usage_limit' => 100,
            'is_active' => true,
        ]);

        Coupon::create([
            'code' => 'MAADROBE500',
            'type' => 'fixed',
            'value' => 500.00,
            'min_order_amount' => 4000.00,
            'max_discount' => 500.00,
            'expiry_date' => now()->addDays(30),
            'usage_limit' => 50,
            'is_active' => true,
        ]);
    }
}
