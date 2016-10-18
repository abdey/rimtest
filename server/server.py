#! /usr/bin/python
# coding=utf-8

from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import uuid


SECRET_KEY = "lol",
DEBUG = True


app = Flask(__name__)
app.config.from_object(__name__)

# Allow cross domain request
CORS(app)


auth_token = None

@app.route("/proxytest", methods=["GET"])
def proxyTest():
    return jsonify({"status": "success"})

@app.route("/login", methods=["POST"])
def login():
    global auth_token
    user = request.get_json(force=True).get('user')
    password = request.get_json(force=True).get('password')
    if user == "riminder" and password == "riminder":
        auth_token = str(uuid.uuid4())
        return jsonify({"token": auth_token})
    abort(400)


@app.route("/data", methods=["GET"])
def data():
    global auth_token
    token = request.args.get('token')
    if token and token == auth_token:
        return jsonify({"data": "Hello World !"})
    abort(403)


@app.route("/logout", methods=["POST"])
def logout():
    global auth_token
    token = request.args.get('token')
    if token and token == auth_token:
        auth_token = None
        return jsonify({"msg": "disconnect success"})
    abort(403)


if __name__ == "__main__":
    app.run()
