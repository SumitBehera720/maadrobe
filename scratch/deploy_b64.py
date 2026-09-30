import os
import tarfile
import paramiko
import base64
import time

HOSTNAME = "145.79.58.122"
PORT = 65002
USERNAME = "u892283443"
PASSWORD = "Qubnix123@"
REMOTE_DOMAIN_PATH = "/home/u892283443/domains/maadrobe.com"
REMOTE_PUBLIC_HTML = f"{REMOTE_DOMAIN_PATH}/public_html"
REMOTE_ADMIN_PATH = f"{REMOTE_PUBLIC_HTML}/admin"

STORE_ARCHIVE = r"d:\Qubnix projects\custom code\storefront_deploy.tar.gz"
ADMIN_ARCHIVE = r"d:\Qubnix projects\custom code\admin_deploy.tar.gz"

def deploy_all():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print(f"Connecting to {HOSTNAME}:{PORT} as {USERNAME}...")
    client.connect(HOSTNAME, port=PORT, username=USERNAME, password=PASSWORD, timeout=30)
    print("SSH connected successfully!")

    print("Opening interactive shell...")
    shell = client.invoke_shell()
    
    # helper to run command and wait for prompt (rough approximation using sleep for deploy scripts)
    def run_cmd(cmd, wait_time=2.0):
        shell.send(cmd + "\n")
        time.sleep(wait_time)
        while shell.recv_ready():
            out = shell.recv(4096).decode('utf-8', errors='replace')
            print(out, end="")
            
    # wait for initial prompt
    time.sleep(2)
    if shell.recv_ready():
        print(shell.recv(4096).decode('utf-8', errors='replace'))

    remote_store_tar = f"{REMOTE_DOMAIN_PATH}/storefront_deploy.tar.gz"
    remote_admin_tar = f"{REMOTE_DOMAIN_PATH}/admin_deploy.tar.gz"

    for archive, remote in [(STORE_ARCHIVE, remote_store_tar), (ADMIN_ARCHIVE, remote_admin_tar)]:
        print(f"Uploading {archive} to {remote} using base64 via shell...")
        with open(archive, "rb") as f:
            data = f.read()
        b64_data = base64.b64encode(data).decode('utf-8')
        
        run_cmd(f"rm -f {remote}.b64", 1)
        run_cmd(f"stty -echo; cat > {remote}.b64", 1)
        
        chunk_size = 32 * 1024
        for i in range(0, len(b64_data), chunk_size):
            chunk = b64_data[i:i+chunk_size]
            shell.sendall(chunk)
            time.sleep(0.05) # prevent flooding buffer
            
        # send Ctrl+D to end cat
        shell.send("\x04")
        time.sleep(1)
        
        run_cmd(f"stty echo", 1)
        print(f"Decoding base64 for {remote}...")
        run_cmd(f"base64 -d {remote}.b64 > {remote} && rm -f {remote}.b64", 5)

    print("Extracting storefront...")
    run_cmd(f"mkdir -p {REMOTE_DOMAIN_PATH}/store_tmp", 1)
    run_cmd(f"tar -xzf {remote_store_tar} -C {REMOTE_DOMAIN_PATH}/store_tmp", 3)
    run_cmd(f"mkdir -p {REMOTE_PUBLIC_HTML}/assets {REMOTE_PUBLIC_HTML}/images", 1)
    run_cmd(f"cp -rf {REMOTE_DOMAIN_PATH}/store_tmp/assets/* {REMOTE_PUBLIC_HTML}/assets/", 2)
    run_cmd(f"cp -rf {REMOTE_DOMAIN_PATH}/store_tmp/images/* {REMOTE_PUBLIC_HTML}/images/ 2>/dev/null || true", 2)
    run_cmd(f"cp -f {REMOTE_DOMAIN_PATH}/store_tmp/index.html {REMOTE_PUBLIC_HTML}/index.html", 1)
    run_cmd(f"rm -rf {REMOTE_DOMAIN_PATH}/store_tmp {remote_store_tar}", 1)

    print("Extracting admin...")
    run_cmd(f"mkdir -p {REMOTE_DOMAIN_PATH}/admin_tmp", 1)
    run_cmd(f"tar -xzf {remote_admin_tar} -C {REMOTE_DOMAIN_PATH}/admin_tmp", 2)
    run_cmd(f"mkdir -p {REMOTE_ADMIN_PATH}/assets", 1)
    run_cmd(f"cp -rf {REMOTE_DOMAIN_PATH}/admin_tmp/assets/* {REMOTE_ADMIN_PATH}/assets/", 2)
    run_cmd(f"cp -f {REMOTE_DOMAIN_PATH}/admin_tmp/index.html {REMOTE_ADMIN_PATH}/index.html", 1)
    run_cmd(f"cp -f {REMOTE_DOMAIN_PATH}/admin_tmp/favicon.svg {REMOTE_ADMIN_PATH}/ 2>/dev/null || true", 1)
    run_cmd(f"cp -f {REMOTE_DOMAIN_PATH}/admin_tmp/icons.svg {REMOTE_ADMIN_PATH}/ 2>/dev/null || true", 1)
    run_cmd(f"rm -rf {REMOTE_DOMAIN_PATH}/admin_tmp {remote_admin_tar}", 1)

    run_cmd(f"ls -lh {REMOTE_PUBLIC_HTML}/index.html", 1)
    run_cmd(f"ls -lh {REMOTE_ADMIN_PATH}/index.html", 1)

    client.close()
    print("\nALL DEPLOYMENTS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    deploy_all()
