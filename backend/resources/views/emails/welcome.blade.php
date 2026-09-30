<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MaaDrobe</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f0eb; color: #2d1a0e; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%); padding: 48px 40px; text-align: center; }
        .header img { width: 60px; height: 60px; margin-bottom: 16px; }
        .header h1 { color: #fff; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px; letter-spacing: 1px; }
        .body { padding: 48px 40px; }
        .greeting { font-size: 22px; font-weight: 600; color: #8B1A1A; margin-bottom: 16px; }
        .text { font-size: 15px; line-height: 1.8; color: #555; margin-bottom: 20px; }
        .highlight-box { background: linear-gradient(135deg, #fdf6f0, #fff0e8); border-left: 4px solid #8B1A1A; border-radius: 8px; padding: 20px 24px; margin: 28px 0; }
        .highlight-box p { font-size: 14px; color: #5a3020; line-height: 1.7; }
        .cta-btn { display: block; width: fit-content; margin: 32px auto; background: linear-gradient(135deg, #8B1A1A, #C0392B); color: #fff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 15px; font-weight: 600; letter-spacing: 0.5px; }
        .divider { height: 1px; background: #f0e8e0; margin: 32px 0; }
        .features { display: table; width: 100%; margin: 8px 0; }
        .feature { display: table-cell; text-align: center; padding: 16px 8px; width: 33%; }
        .feature-icon { font-size: 28px; margin-bottom: 8px; }
        .feature-title { font-size: 13px; font-weight: 600; color: #8B1A1A; margin-bottom: 4px; }
        .feature-desc { font-size: 12px; color: #888; }
        .footer { background: #2d1a0e; padding: 32px 40px; text-align: center; }
        .footer p { color: rgba(255,255,255,0.6); font-size: 12px; line-height: 1.8; }
        .footer a { color: #C0392B; text-decoration: none; }
        .social { margin: 16px 0; }
        .social a { display: inline-block; margin: 0 6px; color: rgba(255,255,255,0.7); font-size: 12px; text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>MaaDrobe</h1>
        <p>Handcrafted Elegance, Delivered</p>
    </div>
    <div class="body">
        <div class="greeting">Welcome, {{ $user->name }}! 🎉</div>
        <p class="text">
            We're thrilled to have you as part of the MaaDrobe family. Your account has been successfully created and you're ready to explore our exclusive collection of handcrafted sarees, ethnic wear, and more.
        </p>
        <div class="highlight-box">
            <p>✨ <strong>Your account is ready!</strong><br>
            Browse thousands of handpicked traditional designs, track your orders in real-time, and enjoy a seamless shopping experience crafted just for you.</p>
        </div>
        <a href="https://maadrobe.com" class="cta-btn">Start Shopping →</a>
        <div class="divider"></div>
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🧵</div>
                <div class="feature-title">Handcrafted</div>
                <div class="feature-desc">Authentic artisan pieces</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🚚</div>
                <div class="feature-title">Fast Delivery</div>
                <div class="feature-desc">Pan-India shipping</div>
            </div>
            <div class="feature">
                <div class="feature-icon">💎</div>
                <div class="feature-title">Premium Quality</div>
                <div class="feature-desc">Curated collections</div>
            </div>
        </div>
        <div class="divider"></div>
        <p class="text" style="font-size: 13px; color: #999; text-align: center;">
            If you did not create this account, please ignore this email or contact us at <a href="mailto:maadrobe@gmail.com" style="color:#8B1A1A;">maadrobe@gmail.com</a>
        </p>
    </div>
    <div class="footer">
        <div class="social">
            <a href="https://maadrobe.com">Website</a> &bull;
            <a href="mailto:maadrobe@gmail.com">Support</a>
        </div>
        <p>© {{ date('Y') }} MaaDrobe. All rights reserved.<br>
        You're receiving this email because you registered on <a href="https://maadrobe.com">maadrobe.com</a></p>
    </div>
</div>
</body>
</html>
