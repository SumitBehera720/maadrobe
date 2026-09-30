import paramiko

hostname = "145.79.58.122"
port = 65002
username = "u892283443"
password = "Qubnix123@"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(hostname, port=port, username=username, password=password, timeout=15)

    commands = [
        "ls -la /home/u892283443/domains/maadrobe.com",
        "ls -la /home/u892283443/domains/maadrobe.com/public_html 2>/dev/null || true",
        "find /home/u892283443/domains/maadrobe.com -maxdepth 2 -type d",
        "head -n 25 /home/u892283443/domains/maadrobe.com/public_html/index.html 2>/dev/null || true"
    ]

    for cmd in commands:
        print(f"\n=== Running: {cmd} ===")
        stdin, stdout, stderr = client.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out:
            print(out)
        if err:
            print(f"[ERR] {err}")

finally:
    client.close()
