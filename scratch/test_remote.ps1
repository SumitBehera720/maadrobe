$SSH_HOST = "145.79.58.122"
$SSH_PORT = "65002"
$SSH_USER = "u892283443"
$SSH_PASS = "Qubnix123@"
$PLINK = "$env:USERPROFILE\.ssh\plink.exe"

Write-Host "Accepting host key..."
"y" | & $PLINK -P $SSH_PORT -pw $SSH_PASS "${SSH_USER}@${SSH_HOST}" "pwd && ls -la /home/$SSH_USER && ls -la /home/$SSH_USER/public_html"
