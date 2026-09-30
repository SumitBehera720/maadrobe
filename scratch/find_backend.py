import paramiko
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=10)
stdin, stdout, stderr = client.exec_command('find /home/u892283443/domains/maadrobe.com -maxdepth 2 -type d')
print(stdout.read().decode())
client.close()
