import paramiko

hostname = "145.79.58.122"
port = 65002
username = "u892283443"
password = "Qubnix123@"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(hostname, port=port, username=username, password=password, timeout=15)
    stdin, stdout, stderr = client.exec_command("ls -la /home/u892283443/domains/maadrobe.com/public_html/admin")
    print(stdout.read().decode('utf-8', errors='replace'))
finally:
    client.close()
