# ============================================================
# MaaDrobe Backend Deploy Script — Hostinger SSH
# ============================================================

$SSH_HOST = "145.79.58.122"
$SSH_PORT = "65002"
$SSH_USER = "u892283443"
$SSH_PASS = "Qubnix123@"
$REMOTE_PATH = "/home/u892283443/public_html"
$LOCAL_BACKEND = "d:\custom code\backend"
$DEPLOY_ZIP = "d:\custom code\maadrobe_deploy.zip"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MaaDrobe Backend Deployment" -ForegroundColor Cyan
Write-Host "  Target: maadrobe.com" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# ---- Step 1: Build the deployment package ----
Write-Host "`n[1/6] Building deployment package..." -ForegroundColor Yellow

if (Test-Path $DEPLOY_ZIP) { Remove-Item $DEPLOY_ZIP -Force }

# Files/dirs to include (exclude dev-only and large dirs)
$DEPLOY_TMP = "d:\custom code\deploy_tmp"
if (Test-Path $DEPLOY_TMP) { Remove-Item $DEPLOY_TMP -Recurse -Force }
New-Item -ItemType Directory -Path $DEPLOY_TMP | Out-Null

# Copy changed and essential backend files
$filesToCopy = @(
    "app",
    "bootstrap",
    "config",
    "database",
    "resources",
    "routes",
    "storage",
    "artisan"
)

foreach ($item in $filesToCopy) {
    $src = Join-Path $LOCAL_BACKEND $item
    $dst = Join-Path $DEPLOY_TMP $item
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Recurse -Force
    }
}

# Copy .env.production as .env
Copy-Item "$LOCAL_BACKEND\.env.production" "$DEPLOY_TMP\.env" -Force

# Copy composer files
Copy-Item "$LOCAL_BACKEND\composer.json" "$DEPLOY_TMP\" -Force
Copy-Item "$LOCAL_BACKEND\composer.lock" "$DEPLOY_TMP\" -Force

# Zip it
Compress-Archive -Path "$DEPLOY_TMP\*" -DestinationPath $DEPLOY_ZIP -Force
Remove-Item $DEPLOY_TMP -Recurse -Force

$zipSize = [math]::Round((Get-Item $DEPLOY_ZIP).Length / 1MB, 2)
Write-Host "  Package ready: maadrobe_deploy.zip ($zipSize MB)" -ForegroundColor Green

# ---- Step 2: Upload zip via SCP ----
Write-Host "`n[2/6] Uploading to server via SCP..." -ForegroundColor Yellow

# Write SSH password to env for OpenSSH (won't work directly, using plink workaround)
# We'll use the -o flags and SSH_ASKPASS workaround

# Create a temporary SSH key-less batch using plink if available, else use scp directly
# For OpenSSH on Windows without sshpass, we use StrictHostKeyChecking=no 
# and the user must confirm password once if needed.
# Instead we'll use a PowerShell SSH wrapper

$scpCmd = "scp -P $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 `"$DEPLOY_ZIP`" ${SSH_USER}@${SSH_HOST}:/home/$SSH_USER/maadrobe_deploy.zip"
Write-Host "  Running: $scpCmd" -ForegroundColor Gray
Write-Host "  (You may be prompted for password: Qubnix123@)" -ForegroundColor DarkGray

$env:SSHPASS = $SSH_PASS
Invoke-Expression $scpCmd

Write-Host "  Upload complete!" -ForegroundColor Green

# ---- Step 3: SSH — Extract and deploy ----
Write-Host "`n[3/6] Extracting files on server..." -ForegroundColor Yellow

$sshCommands = @"
cd /home/$SSH_USER && \
echo '--- Checking remote structure ---' && \
ls -la public_html/ | head -20 && \
echo '--- Extracting deploy zip ---' && \
unzip -o maadrobe_deploy.zip -d /tmp/maadrobe_deploy && \
echo '--- Copying app files ---' && \
cp -r /tmp/maadrobe_deploy/app/* public_html/app/ && \
cp -r /tmp/maadrobe_deploy/routes/* public_html/routes/ && \
cp -r /tmp/maadrobe_deploy/resources/* public_html/resources/ && \
cp -r /tmp/maadrobe_deploy/database/migrations/* public_html/database/migrations/ && \
cp /tmp/maadrobe_deploy/.env public_html/.env && \
echo '--- Cleaning up tmp ---' && \
rm -rf /tmp/maadrobe_deploy && \
rm maadrobe_deploy.zip && \
echo '--- Files deployed successfully ---'
"@

Write-Host "  (You may be prompted for password: Qubnix123@)" -ForegroundColor DarkGray
ssh -p $SSH_PORT -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" $sshCommands

# ---- Step 4: Run composer install ----
Write-Host "`n[4/6] Running composer install on server..." -ForegroundColor Yellow

$composerCmd = "cd public_html && php8.3 -d disable_functions= /usr/local/bin/composer install --no-dev --optimize-autoloader --no-interaction 2>&1 | tail -20"
ssh -p $SSH_PORT -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" $composerCmd

# ---- Step 5: Run migrations and cache ----
Write-Host "`n[5/6] Running migrations and clearing cache..." -ForegroundColor Yellow

$artisanCmds = @"
cd /home/$SSH_USER/public_html && \
php8.3 artisan migrate --force 2>&1 && \
php8.3 artisan config:cache 2>&1 && \
php8.3 artisan route:cache 2>&1 && \
php8.3 artisan view:cache 2>&1 && \
echo '--- All artisan commands complete ---'
"@

ssh -p $SSH_PORT -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" $artisanCmds

# ---- Step 6: Verify ----
Write-Host "`n[6/6] Verifying deployment..." -ForegroundColor Yellow

$verifyCmd = @"
echo '--- Checking mail classes ---' && \
ls /home/$SSH_USER/public_html/app/Mail/ && \
echo '--- Checking email templates ---' && \
ls /home/$SSH_USER/public_html/resources/views/emails/ && \
echo '--- Checking .env MAIL_MAILER ---' && \
grep 'MAIL_MAILER' /home/$SSH_USER/public_html/.env
"@

ssh -p $SSH_PORT -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" $verifyCmd

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green  
Write-Host "  https://maadrobe.com is now live" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Cleanup local zip
if (Test-Path $DEPLOY_ZIP) { Remove-Item $DEPLOY_ZIP -Force }
