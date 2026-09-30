import os
import tarfile
import paramiko

HOSTNAME = "145.79.58.122"
PORT = 65002
USERNAME = "u892283443"
PASSWORD = "Qubnix123@"
REMOTE_DOMAIN_PATH = "/home/u892283443/domains/maadrobe.com"
REMOTE_PUBLIC_HTML = f"{REMOTE_DOMAIN_PATH}/public_html"

LOCAL_DIST = r"d:\Qubnix projects\custom code\dist"
ARCHIVE_PATH = r"d:\Qubnix projects\custom code\dist_deploy.tar.gz"

def create_dist_archive():
    print(f"Creating archive {ARCHIVE_PATH} from {LOCAL_DIST}...")
    with tarfile.open(ARCHIVE_PATH, "w:gz") as tar:
        for root, dirs, files in os.walk(LOCAL_DIST):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, LOCAL_DIST)
                tar.add(full_path, arcname=rel_path)
    size_mb = os.path.getsize(ARCHIVE_PATH) / (1024 * 1024)
    print(f"Archive created: {size_mb:.2f} MB")

def deploy():
    create_dist_archive()

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print(f"Connecting to {HOSTNAME}:{PORT} as {USERNAME}...")
    client.connect(HOSTNAME, port=PORT, username=USERNAME, password=PASSWORD, timeout=30)
    print("SSH connected!")

    # SFTP upload
    sftp = client.open_sftp()
    remote_archive = f"{REMOTE_DOMAIN_PATH}/dist_deploy.tar.gz"
    print(f"Uploading archive to {remote_archive}...")
    sftp.put(ARCHIVE_PATH, remote_archive)
    print("Upload complete!")
    sftp.close()

    # Commands to extract and update
    deploy_commands = [
        f"mkdir -p {REMOTE_DOMAIN_PATH}/dist_tmp",
        f"tar -xzf {REMOTE_DOMAIN_PATH}/dist_deploy.tar.gz -C {REMOTE_DOMAIN_PATH}/dist_tmp",
        f"cp -r {REMOTE_DOMAIN_PATH}/dist_tmp/assets/* {REMOTE_PUBLIC_HTML}/assets/",
        f"cp -r {REMOTE_DOMAIN_PATH}/dist_tmp/images/* {REMOTE_PUBLIC_HTML}/images/",
        f"cp {REMOTE_DOMAIN_PATH}/dist_tmp/index.html {REMOTE_PUBLIC_HTML}/index.html",
        f"cp {REMOTE_DOMAIN_PATH}/dist_tmp/favicon.svg {REMOTE_PUBLIC_HTML}/ 2>/dev/null || true",
        f"cp {REMOTE_DOMAIN_PATH}/dist_tmp/icons.svg {REMOTE_PUBLIC_HTML}/ 2>/dev/null || true",
        f"rm -rf {REMOTE_DOMAIN_PATH}/dist_tmp",
        f"rm -f {REMOTE_DOMAIN_PATH}/dist_deploy.tar.gz",
        f"ls -la {REMOTE_PUBLIC_HTML}",
        f"head -n 25 {REMOTE_PUBLIC_HTML}/index.html"
    ]

    for cmd in deploy_commands:
        print(f"\n>>> Running: {cmd}")
        stdin, stdout, stderr = client.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out:
            print(out.strip())
        if err:
            print(f"[ERR] {err.strip()}")

    client.close()
    print("\nDeployment execution finished successfully!")

    if os.path.exists(ARCHIVE_PATH):
        os.remove(ARCHIVE_PATH)

if __name__ == "__main__":
    deploy()
