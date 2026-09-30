<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Update — MaaDrobe</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f0eb; color: #2d1a0e; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { padding: 48px 40px; text-align: center; }
        .header-confirmed  { background: linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%); }
        .header-cancelled  { background: linear-gradient(135deg, #555 0%, #333 100%); }
        .header h1 { color: #fff; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px; }
        .status-badge { display: inline-block; color: #fff; font-size: 13px; font-weight: 600; padding: 6px 20px; border-radius: 50px; margin-top: 16px; letter-spacing: 1px; }
        .badge-pending       { background: #e67e22; }
        .badge-confirmed     { background: #27ae60; }
        .badge-processing    { background: #2980b9; }
        .badge-shipped       { background: #8e44ad; }
        .badge-delivered     { background: #27ae60; }
        .badge-cancelled     { background: #e74c3c; }
        .body { padding: 48px 40px; }
        .greeting { font-size: 22px; font-weight: 600; color: #8B1A1A; margin-bottom: 12px; }
        .text { font-size: 15px; line-height: 1.8; color: #555; margin-bottom: 20px; }
        .status-message { border-radius: 10px; padding: 20px 24px; margin: 24px 0; }
        .status-message-normal   { background: linear-gradient(135deg, #fdf6f0, #fff0e8); border-left: 4px solid #8B1A1A; }
        .status-message-cancelled { background: #fff5f5; border-left: 4px solid #e74c3c; }
        .status-message p { font-size: 14px; line-height: 1.7; }
        .order-info { background: #f9f9f9; border-radius: 10px; padding: 20px 24px; margin: 24px 0; }
        .order-info-row { display: table; width: 100%; margin-bottom: 10px; }
        .order-info-label { display: table-cell; font-size: 13px; color: #999; width: 45%; }
        .order-info-value { display: table-cell; font-size: 14px; color: #2d1a0e; font-weight: 600; }
        .timeline { margin: 28px 0; }
        .timeline-title { font-size: 16px; font-weight: 700; color: #8B1A1A; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
        .timeline-step { display: flex; align-items: center; margin-bottom: 12px; }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; margin-right: 16px; flex-shrink: 0; }
        .dot-done { background: #27ae60; }
        .dot-active { background: #8B1A1A; box-shadow: 0 0 0 3px rgba(139,26,26,0.2); }
        .dot-pending { background: #ddd; }
        .timeline-label { font-size: 13px; color: #555; }
        .timeline-label.active { color: #8B1A1A; font-weight: 700; }
        .cta-btn { display: block; width: fit-content; margin: 24px auto; background: linear-gradient(135deg, #8B1A1A, #C0392B); color: #fff; text-decoration: none; padding: 14px 36px; border-radius: 50px; font-size: 14px; font-weight: 600; }
        .divider { height: 1px; background: #f0e8e0; margin: 32px 0; }
        .footer { background: #2d1a0e; padding: 32px 40px; text-align: center; }
        .footer p { color: rgba(255,255,255,0.6); font-size: 12px; line-height: 1.8; }
        .footer a { color: #C0392B; text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">

    @php
        $isCancelled = $order->status === 'cancelled';
        $statusLabels = [
            'pending'    => 'Pending',
            'confirmed'  => 'Confirmed',
            'processing' => 'Processing',
            'shipped'    => 'Shipped',
            'delivered'  => 'Delivered',
            'cancelled'  => 'Cancelled',
        ];
        $statusIcons = [
            'pending'    => '🕐',
            'confirmed'  => '✅',
            'processing' => '⚙️',
            'shipped'    => '🚚',
            'delivered'  => '🎉',
            'cancelled'  => '❌',
        ];
        $currentStatus = $order->status;
        $icon = $statusIcons[$currentStatus] ?? '📦';
        $label = $statusLabels[$currentStatus] ?? ucfirst($currentStatus);

        $statusMessages = [
            'pending'    => 'Your order is pending and will be confirmed shortly.',
            'confirmed'  => 'Great news! Your order has been confirmed and will be prepared soon.',
            'processing' => 'Your order is now being processed and prepared for shipment.',
            'shipped'    => 'Your order is on its way! You should receive it within the expected delivery window.',
            'delivered'  => 'Your order has been delivered. We hope you love your purchase! 🎊',
            'cancelled'  => 'Your order has been cancelled. If you did not request this or have any questions, please contact our support team.',
        ];
        $message = $statusMessages[$currentStatus] ?? 'Your order status has been updated.';

        $allSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
        $currentIndex = array_search($currentStatus, $allSteps);
    @endphp

    <div class="header {{ $isCancelled ? 'header-cancelled' : 'header-confirmed' }}">
        <h1>MaaDrobe</h1>
        <p>Order Update</p>
        <div class="status-badge badge-{{ $currentStatus }}">{{ $icon }} {{ $label }}</div>
    </div>

    <div class="body">
        <div class="greeting">Hello, {{ $order->customer_name }} 👋</div>
        <p class="text">
            {{ $isCancelled ? 'We\'re writing to inform you about a change to your order.' : 'We have an update on your MaaDrobe order!' }}
        </p>

        <div class="status-message {{ $isCancelled ? 'status-message-cancelled' : 'status-message-normal' }}">
            <p>{{ $message }}</p>
        </div>

        <div class="order-info">
            <div class="order-info-row">
                <div class="order-info-label">Order Number</div>
                <div class="order-info-value">#{{ $order->order_number }}</div>
            </div>
            <div class="order-info-row">
                <div class="order-info-label">Order Date</div>
                <div class="order-info-value">{{ $order->created_at->format('d M Y') }}</div>
            </div>
            <div class="order-info-row">
                <div class="order-info-label">Current Status</div>
                <div class="order-info-value">{{ $icon }} {{ $label }}</div>
            </div>
            <div class="order-info-row">
                <div class="order-info-label">Total Amount</div>
                <div class="order-info-value">₹{{ number_format($order->total_amount, 2) }}</div>
            </div>
        </div>

        @if(!$isCancelled)
        <div class="timeline">
            <div class="timeline-title">Order Progress</div>
            @foreach($allSteps as $index => $step)
            @php
                $isDone = $currentIndex !== false && $index < $currentIndex;
                $isActive = $currentIndex !== false && $index === $currentIndex;
            @endphp
            <div class="timeline-step">
                <div class="timeline-dot {{ $isDone ? 'dot-done' : ($isActive ? 'dot-active' : 'dot-pending') }}"></div>
                <div class="timeline-label {{ $isActive ? 'active' : '' }}">
                    {{ $statusLabels[$step] }}{{ $isActive ? ' ← Current' : '' }}
                </div>
            </div>
            @endforeach
        </div>
        @endif

        <a href="https://maadrobe.com" class="cta-btn">
            {{ $isCancelled ? 'Shop Again →' : 'Track My Order →' }}
        </a>

        <div class="divider"></div>
        <p class="text" style="font-size: 13px; color: #999; text-align: center;">
            Need help? Contact us at <a href="mailto:maadrobe@gmail.com" style="color:#8B1A1A;">maadrobe@gmail.com</a>
        </p>
    </div>
    <div class="footer">
        <p>© {{ date('Y') }} MaaDrobe. All rights reserved.<br>
        <a href="https://maadrobe.com">maadrobe.com</a></p>
    </div>
</div>
</body>
</html>
