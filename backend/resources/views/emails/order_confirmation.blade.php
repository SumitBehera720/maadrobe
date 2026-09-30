<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed — MaaDrobe</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f0eb; color: #2d1a0e; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%); padding: 48px 40px; text-align: center; }
        .header h1 { color: #fff; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px; }
        .status-badge { display: inline-block; background: #27ae60; color: #fff; font-size: 13px; font-weight: 600; padding: 6px 20px; border-radius: 50px; margin-top: 16px; letter-spacing: 1px; }
        .body { padding: 48px 40px; }
        .greeting { font-size: 22px; font-weight: 600; color: #8B1A1A; margin-bottom: 12px; }
        .text { font-size: 15px; line-height: 1.8; color: #555; margin-bottom: 20px; }
        .order-info { background: linear-gradient(135deg, #fdf6f0, #fff0e8); border-radius: 10px; padding: 24px; margin: 24px 0; }
        .order-info-row { display: table; width: 100%; margin-bottom: 10px; }
        .order-info-label { display: table-cell; font-size: 13px; color: #999; width: 45%; }
        .order-info-value { display: table-cell; font-size: 14px; color: #2d1a0e; font-weight: 600; }
        .section-title { font-size: 16px; font-weight: 700; color: #8B1A1A; margin: 28px 0 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #f0e8e0; padding-bottom: 8px; }
        .item-row { display: table; width: 100%; padding: 14px 0; border-bottom: 1px solid #f5f0eb; }
        .item-row:last-child { border-bottom: none; }
        .item-name-cell { display: table-cell; vertical-align: top; }
        .item-name { font-size: 14px; font-weight: 600; color: #2d1a0e; }
        .item-meta { font-size: 12px; color: #999; margin-top: 3px; }
        .item-price-cell { display: table-cell; text-align: right; vertical-align: top; }
        .item-qty { font-size: 12px; color: #999; }
        .item-price { font-size: 14px; font-weight: 700; color: #8B1A1A; }
        .total-row { display: table; width: 100%; padding: 16px 0 0; }
        .total-label { display: table-cell; font-size: 16px; font-weight: 700; color: #2d1a0e; }
        .total-amount { display: table-cell; text-align: right; font-size: 20px; font-weight: 800; color: #8B1A1A; }
        .track-box { background: #f0f8ff; border: 1px solid #bde; border-radius: 10px; padding: 20px 24px; margin: 28px 0; text-align: center; }
        .track-box p { font-size: 13px; color: #555; margin-bottom: 8px; }
        .track-number { font-size: 18px; font-weight: 800; color: #2980b9; letter-spacing: 2px; font-family: 'Courier New', monospace; }
        .cta-btn { display: block; width: fit-content; margin: 24px auto; background: linear-gradient(135deg, #8B1A1A, #C0392B); color: #fff; text-decoration: none; padding: 14px 36px; border-radius: 50px; font-size: 14px; font-weight: 600; }
        .divider { height: 1px; background: #f0e8e0; margin: 32px 0; }
        .footer { background: #2d1a0e; padding: 32px 40px; text-align: center; }
        .footer p { color: rgba(255,255,255,0.6); font-size: 12px; line-height: 1.8; }
        .footer a { color: #C0392B; text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>MaaDrobe</h1>
        <p>Order Confirmation</p>
        <div class="status-badge">✓ Order Confirmed</div>
    </div>
    <div class="body">
        <div class="greeting">Thank you, {{ $order->customer_name }}! 🎊</div>
        <p class="text">
            Your order has been successfully placed and is being processed. We'll keep you updated every step of the way!
        </p>

        <div class="order-info">
            <div class="order-info-row">
                <div class="order-info-label">Order Number</div>
                <div class="order-info-value">#{{ $order->order_number }}</div>
            </div>
            <div class="order-info-row">
                <div class="order-info-label">Order Date</div>
                <div class="order-info-value">{{ $order->created_at->format('d M Y, h:i A') }}</div>
            </div>
            <div class="order-info-row">
                <div class="order-info-label">Payment Method</div>
                <div class="order-info-value">{{ ucfirst(str_replace('_', ' ', $order->checkout_type)) }}</div>
            </div>
            <div class="order-info-row">
                <div class="order-info-label">Shipping To</div>
                <div class="order-info-value">{{ $order->city }}, {{ $order->pincode }}</div>
            </div>
        </div>

        <div class="section-title">Items Ordered</div>
        @foreach($order->items as $item)
        <div class="item-row">
            <div class="item-name-cell">
                <div class="item-name">{{ $item->product_name }}</div>
                <div class="item-meta">
                    @if($item->size) Size: {{ $item->size }}@endif
                    @if($item->color){{ $item->size ? ' · ' : '' }}Color: {{ $item->color }}@endif
                </div>
            </div>
            <div class="item-price-cell">
                <div class="item-qty">Qty: {{ $item->quantity }}</div>
                <div class="item-price">₹{{ number_format($item->price * $item->quantity, 2) }}</div>
            </div>
        </div>
        @endforeach

        <div class="total-row">
            <div class="total-label">Total Amount</div>
            <div class="total-amount">₹{{ number_format($order->total_amount, 2) }}</div>
        </div>

        <div class="track-box">
            <p>Use this order number to track your order anytime</p>
            <div class="track-number">{{ $order->order_number }}</div>
        </div>

        <a href="https://maadrobe.com" class="cta-btn">Track My Order →</a>

        <div class="divider"></div>
        <p class="text" style="font-size: 13px; color: #999; text-align: center;">
            Questions? Email us at <a href="mailto:maadrobe@gmail.com" style="color:#8B1A1A;">maadrobe@gmail.com</a>
        </p>
    </div>
    <div class="footer">
        <p>© {{ date('Y') }} MaaDrobe. All rights reserved.<br>
        <a href="https://maadrobe.com">maadrobe.com</a></p>
    </div>
</div>
</body>
</html>
