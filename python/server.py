#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from update import update, state, preview
from image import image_list, image_save, font_list

PORT = 5000

app = Flask(__name__)
CORS(app)

app.route("/update", methods=["POST"])(update)
app.route("/state", methods=["GET"])(state)
app.route("/preview", methods=["POST"])(preview)
app.route("/image", methods=["GET"])(image_list)
app.route("/image/<name>", methods=["POST"])(image_save)
app.route("/font", methods=["GET"])(font_list)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
