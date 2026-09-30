import os
import paramiko
import base64
import time

HOSTNAME = "145.79.58.122"
PORT = 65002
USERNAME = "u892283443"
PASSWORD = "Qubnix123@"
REMOTE_DOMAIN_PATH = "/home/u892283443/domains/maadrobe.com"

# The backend might be at /home/u892283443/domains/maadrobe.com or inside a backend/ folder.
# Let's assume it's directly in /home/u892283443/domains/maadrobe.com/backend or we can find it.
# Usually, Laravel is in the root or a 'backend' folder.

def deploy_backend():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print(f"Connecting to {HOSTNAME}:{PORT} as {USERNAME}...")
    client.connect(HOSTNAME, port=PORT, username=USERNAME, password=PASSWORD, timeout=30)
    print("SSH connected successfully!")

    print("Opening interactive shell...")
    shell = client.invoke_shell()
    
    def run_cmd(cmd, wait_time=2.0):
        shell.send(cmd + "\n")
        time.sleep(wait_time)
        while shell.recv_ready():
            out = shell.recv(4096).decode('utf-8', errors='replace')
            print(out, end="")

    time.sleep(2)
    if shell.recv_ready():
        print(shell.recv(4096).decode('utf-8', errors='replace'))

    # Upload files using base64
    files_to_upload = [
        (r"d:\Qubnix projects\custom code\backend\app\Http\Controllers\Api\CouponController.php", 
         f"{REMOTE_DOMAIN_PATH}/backend/app/Http/Controllers/Api/CouponController.php"),
        (r"d:\Qubnix projects\custom code\backend\app\Http\Controllers\Api\OrderController.php", 
         f"{REMOTE_DOMAIN_PATH}/backend/app/Http/Controllers/Api/OrderController.php")
    ]

    for local_file, remote_file in files_to_upload:
        print(f"Uploading {local_file} to {remote_file}...")
        with open(local_file, "rb") as f:
            data = f.read()
        b64_data = base64.b64encode(data).decode('utf-8')
        
        run_cmd(f"rm -f {remote_file}.b64", 1)
        run_cmd(f"stty -echo; cat > {remote_file}.b64", 1)
        
        chunk_size = 32 * 1024
        for i in range(0, len(b64_data), chunk_size):
            chunk = b64_data[i:i+chunk_size]
            shell.sendall(chunk)
            time.sleep(0.05)
            
        shell.send("\x04")
        time.sleep(1)
        
        run_cmd(f"stty echo", 1)
        # Attempt to decode, if it fails, maybe the folder is just maadrobe.com, not maadrobe.com/backend
        # So let's try both paths
        run_cmd(f"base64 -d {remote_file}.b64 > {remote_file} || base64 -d {remote_file}.b64 > {REMOTE_DOMAIN_PATH}/app/Http/Controllers/Api/$(basename {remote_file})", 2)
        run_cmd(f"rm -f {remote_file}.b64", 1)

    client.close()
    print("\nBackend deployment complete!")

if __name__ == "__main__":
    deploy_backend()
