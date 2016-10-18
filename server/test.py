import requests as r


req = r.post("http://localhost:5000/login", json={"user": "riminder", "password": "riminder"})
token = req.json()['token']
print "Correct login call"
print req.content

req = r.get("http://localhost:5000/data?token={}".format(token))
print "Correct data call"
print req.content

req = r.get("http://localhost:5000/data?token={}".format("lol"))
print "Bad data call"
print req.content

req = r.post("http://localhost:5000/logout?token={}".format("lol"))
print "Bad logout call"
print req.content

req = r.get("http://localhost:5000/data?token={}".format(token))
print "Correct data call"
print req.content

req = r.post("http://localhost:5000/logout?token={}".format(token))
print "Correct logout call"
print req.content

req = r.get("http://localhost:5000/data?token={}".format(token))
print "Bad data call"
print req.content