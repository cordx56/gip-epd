from flask import request, jsonify
import os
import base64
import io
import glob
import traceback
from PIL import Image

def image_save(name):
    if "image" not in request.json:
        return jsonify({ "message": "Image not specified" }), 400
    try:
        decode_data = base64.b64decode(request.json["image"])
        img = Image.open(io.BytesIO(decode_data))
        img.verify()
    except Exception as e:
        return jsonify({ "status": False, "message": "Image format error!\n" + str(e) + "\n" + traceback.format_exc() }), 400
    try:
        with open(os.path.join("./image", name), "wb") as f:
            f.write(decode_data)
    except Exception as e:
        return jsonify({ "status": False, "message": "File write error!\n" + str(e) + "\n" + traceback.format_exc() }), 500
    return jsonify({ "status": True })

def image_list():
    images = glob.glob("./image/*")
    images = map(lambda x: os.path.basename(x), images)
    return jsonify({ "stratus": True, "data": list(images) })

def font_list():
    images = glob.glob("./font/*")
    images = map(lambda x: os.path.basename(x), images)
    return jsonify({ "stratus": True, "data": list(images) })
