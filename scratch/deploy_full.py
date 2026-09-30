import os
import tarfile
import paramiko

HOSTNAME = "145.79.58.122"
PORT = 65002
USERNAME = "u892283443"
PASSWORD = "Qubnix123@"
REMOTE_DOMAIN_PATH = "/home/u892283443/domains/maadrobe.com"
REMOTE_PUBLIC_HTML = f"{REMOTE_DOMAIN_PATH}/public_html"
REMOTE_ADMIN_PATH = f"{REMOTE_PUBLIC_HTML}/admin"

LOCAL_STORE_DIST = r"d:\Qubnix projects\custom code\dist"
LOCAL_ADMIN_DIST = r"d:\Qubnix projects\custom code\admin\dist"

STORE_ARCHIVE = r"d:\Qubnix projects\custom code\storefront_deploy.tar.gz"
ADMIN_ARCHIVE = r"d:\Qubnix projects\custom code\admin_deploy.tar.gz"

def create_archive(src_dir, dest_archive):
    print(f"Archiving {src_dir} -> {dest_archive}...")
    with tarfile.open(dest_archive, "w:gz") as tar:
        for root, dirs, files in os.walk(src_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, src_dir)
                tar.add(full_path, arcname=rel_path)
    size_mb = os.path.getsize(dest_archive) / (1024 * 1024)
    print(f"Archive created: {size_mb:.2f} MB")

def deploy_all():
    create_archive(LOCAL_STORE_DIST, STORE_ARCHIVE)
    create_archive(LOCAL_ADMIN_DIST, ADMIN_ARCHIVE)

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print(f"Connecting to {HOSTNAME}:{PORT} as {USERNAME}...")
    client.connect(HOSTNAME, port=PORT, username=USERNAME, password=PASSWORD, timeout=30)
    print("SSH connected successfully!")

    from scp import SCPClient
    scp = SCPClient(client.get_transport())
    remote_store_tar = f"{REMOTE_DOMAIN_PATH}/storefront_deploy.tar.gz"
    remote_admin_tar = f"{REMOTE_DOMAIN_PATH}/admin_deploy.tar.gz"

    print(f"Uploading storefront archive to {remote_store_tar}...")
    scp.put(STORE_ARCHIVE, remote_store_tar)

    print(f"Uploading admin archive to {remote_admin_tar}...")
    scp.put(ADMIN_ARCHIVE, remote_admin_tar)

    print("Uploads complete!")
    scp.close()

    deploy_commands = [
        # Deploy Storefront
        f"mkdir -p {REMOTE_DOMAIN_PATH}/store_tmp",
        f"tar -xzf {remote_store_tar} -C {REMOTE_DOMAIN_PATH}/store_tmp",
        f"mkdir -p {REMOTE_PUBLIC_HTML}/assets {REMOTE_PUBLIC_HTML}/images",
        f"cp -rf {REMOTE_DOMAIN_PATH}/store_tmp/assets/* {REMOTE_PUBLIC_HTML}/assets/",
        f"cp -rf {REMOTE_DOMAIN_PATH}/store_tmp/images/* {REMOTE_PUBLIC_HTML}/images/ 2>/dev/null || true",
        f"cp -f {REMOTE_DOMAIN_PATH}/store_tmp/index.html {REMOTE_PUBLIC_HTML}/index.html",
        f"cp -f '{REMOTE_DOMAIN_PATH}/store_tmp/'*.webp {REMOTE_PUBLIC_HTML}/ 2>/dev/null || true",
        f"cp -f '{REMOTE_DOMAIN_PATH}/store_tmp/'*.png {REMOTE_PUBLIC_HTML}/ 2>/dev/null || true",
        f"cp -f '{REMOTE_DOMAIN_PATH}/store_tmp/'*.svg {REMOTE_PUBLIC_HTML}/ 2>/dev/null || true",
        f"cp -f '{REMOTE_DOMAIN_PATH}/store_tmp/'*.ico {REMOTE_PUBLIC_HTML}/ 2>/dev/null || true",
        f"rm -rf {REMOTE_DOMAIN_PATH}/store_tmp {remote_store_tar}",

        # Deploy Admin
        f"mkdir -p {REMOTE_DOMAIN_PATH}/admin_tmp",
        f"tar -xzf {remote_admin_tar} -C {REMOTE_DOMAIN_PATH}/admin_tmp",
        f"mkdir -p {REMOTE_ADMIN_PATH}/assets {REMOTE_ADMIN_PATH}/images",
        f"cp -rf {REMOTE_DOMAIN_PATH}/admin_tmp/assets/* {REMOTE_ADMIN_PATH}/assets/",
        f"cp -rf {REMOTE_DOMAIN_PATH}/admin_tmp/images/* {REMOTE_ADMIN_PATH}/images/ 2>/dev/null || true",
        f"cp -f {REMOTE_DOMAIN_PATH}/admin_tmp/index.html {REMOTE_ADMIN_PATH}/index.html",
        f"cp -f '{REMOTE_DOMAIN_PATH}/admin_tmp/'*.webp {REMOTE_ADMIN_PATH}/ 2>/dev/null || true",
        f"cp -f '{REMOTE_DOMAIN_PATH}/admin_tmp/'*.png {REMOTE_ADMIN_PATH}/ 2>/dev/null || true",
        f"cp -f '{REMOTE_DOMAIN_PATH}/admin_tmp/'*.svg {REMOTE_ADMIN_PATH}/ 2>/dev/null || true",
        f"cp -f '{REMOTE_DOMAIN_PATH}/admin_tmp/'*.ico {REMOTE_ADMIN_PATH}/ 2>/dev/null || true",
        f"rm -rf {REMOTE_DOMAIN_PATH}/admin_tmp {remote_admin_tar}",

        # Verify deployment
        f"ls -lh {REMOTE_PUBLIC_HTML}/index.html",
        f"ls -lh {REMOTE_ADMIN_PATH}/index.html",
        f"head -n 15 {REMOTE_PUBLIC_HTML}/index.html",
        f"head -n 15 {REMOTE_ADMIN_PATH}/index.html"
    ]

    for cmd in deploy_commands:
        print(f"\n>>> Running: {cmd}")
        stdin, stdout, stderr = client.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out.strip():
            try:
                print(out.strip())
            except UnicodeEncodeError:
                print(out.strip().encode('ascii', errors='replace').decode('ascii'))
        if err:
            print(f"[ERR] {err.strip()}")

    client.close()
    print("\nALL DEPLOYMENTS COMPLETED SUCCESSFULLY!")

    if os.path.exists(STORE_ARCHIVE):
        os.remove(STORE_ARCHIVE)
    if os.path.exists(ADMIN_ARCHIVE):
        os.remove(ADMIN_ARCHIVE)

if __name__ == "__main__":
    deploy_all()
