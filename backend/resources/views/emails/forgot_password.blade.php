<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP — MaaDrobe</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f0eb; color: #2d1a0e; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%); padding: 48px 40px; text-align: center; }
        .header h1 { color: #fff; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px; letter-spacing: 1px; }
        .body { padding: 48px 40px; }
        .greeting { font-size: 22px; font-weight: 600; color: #8B1A1A; margin-bottom: 16px; }
        .text { font-size: 15px; line-height: 1.8; color: #555; margin-bottom: 20px; }
        .otp-container { text-align: center; margin: 36px 0; }
        .otp-label { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
        .otp-box { display: inline-block; background: linear-gradient(135deg, #fdf6f0, #fff0e8); border: 2px solid #8B1A1A; border-radius: 12px; padding: 20px 48px; }
        .otp-code { font-size: 48px; font-weight: 800; letter-spacing: 12px; color: #8B1A1A; font-family: 'Courier New', monospace; }
        .expiry-note { font-size: 13px; color: #e74c3c; margin-top: 12px; font-weight: 500; }
        .warning-box { background: #fff8f0; border-left: 4px solid #e67e22; border-radius: 8px; padding: 16px 20px; margin: 28px 0; }
        .warning-box p { font-size: 13px; color: #7d5a3c; line-height: 1.7; }
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
        <p>Password Reset Request</p>
    </div>
    <div class="body">
        <div class="greeting">Hello, {{ $user->name }} 👋</div>
        <p class="text">
            We received a request to reset your MaaDrobe account password. Use the OTP below to proceed with resetting your password.
        </p>
        <div class="otp-container">
            <div class="otp-label">Your One-Time Password</div>
            <div class="otp-box">
                <div class="otp-code">{{ $otp }}</div>
            </div>
            <div class="expiry-note">⏱ This OTP expires in 15 minutes</div>
        </div>
        <div class="warning-box">
            <p>🔒 <strong>Security Notice:</strong> Never share this OTP with anyone. MaaDrobe staff will never ask for your OTP. If you did not request a password reset, please ignore this email — your account remains secure.</p>
        </div>
        <div class="divider"></div>
        <p class="text" style="font-size: 13px; color: #999; text-align: center;">
            Having trouble? Contact us at <a href="mailto:maadrobe@gmail.com" style="color:#8B1A1A;">maadrobe@gmail.com</a>
        </p>
    </div>
    <div class="footer">
        <p>© {{ date('Y') }} MaaDrobe. All rights reserved.<br>
        <a href="https://maadrobe.com">maadrobe.com</a></p>
    </div>
</div>
</body>
</html>
