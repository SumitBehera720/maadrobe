import urllib.request
import re

url = 'https://maadrobe.com/admin/assets/index-BYrlkSBE.js'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    content = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    matches = re.findall(r'auth/login[a-zA-Z0-9/._-]*', content)
    print("Found auth/login in live admin bundle:")
    print(matches)
    matches_all = re.findall(r'/[a-zA-Z0-9_-]+/auth/login', content)
    print("Found all /.../auth/login:")
    print(matches_all)
except Exception as e:
    print(e)
