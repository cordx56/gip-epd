import os
import io
import base64
import traceback
from PIL import Image, ImageDraw, ImageFont
from flask import request, jsonify
from epdpil import EPD

epd = EPD()
epddata = { "image": "init.png", "texts": [] }

def update():
    global epddata
    if "image" in request.json:
        epddata["image"] = request.json["image"]
    if "texts" in request.json and isinstance(request.json["texts"], list):
        epddata["texts"] = request.json["texts"]
    try:
        img_base64 = draw()
    except Exception as e:
        return jsonify({ "status": False, "message": "Draw error!\n" + str(e) + "\n" + traceback.format_exc() }), 500
    return jsonify({ "status": True, "image": img_base64 })

def draw():
    global epddata
    buffer = io.BytesIO()
    with Image.open(os.path.join("./image", epddata["image"])) as img:
        drw = ImageDraw.Draw(img)
        for text in epddata["texts"]:
            drw.font = ImageFont.truetype(os.path.join("./font", text["font"]), int(text["size"]) if "size" in text else 18)
            color = (0, 0, 0)
            if "color" in text:
                if text["color"] == "White":
                    color = (255, 255, 255)
                if text["color"] == "Red":
                    color = (255, 0, 0)
            drw.text(
                (int(text["x"]), int(text["y"])) if "x" in text and "y" in text else (0, 0),
                text["text"] if "text" in text else "",
                color
            )
        epd.init()
        epd.display_frame(epd.get_frame_buffer(img.transpose(Image.ROTATE_180)))
        epd.sleep()
        img.save(buffer, format="png")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")

def state():
    global epddata
    return jsonify({ "status": True, "data": epddata })
