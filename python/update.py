import os
import io
import base64
import json
import traceback
from PIL import Image, ImageDraw, ImageFont
from flask import request, jsonify
#from epd5in83bc import EPD

#epd = EPD()
def read_epddata():
    if not os.path.isfile("epddata.json"):
        return { "image": "", "texts": [] }
    with open("epddata.json") as f:
        epddata = json.load(f)
    return epddata
def write_epddata(epddata):
    with open("epddata.json", "w") as f:
        json.dump(epddata, f)

def update():
    try:
        epddata = read_epddata()
        if "image" in request.json:
            epddata["image"] = request.json["image"]
        if "texts" in request.json and isinstance(request.json["texts"], list):
            epddata["texts"] = request.json["texts"]
        write_epddata(epddata)
        img_base64 = draw(epddata)
    except Exception as e:
        return jsonify({ "status": False, "message": "Draw error!\n" + str(e) + "\n" + traceback.format_exc() }), 500
    return jsonify({ "status": True, "image": img_base64 })

def split_black_red(img):
    img_rgb = img.convert('RGB')
    size = img_rgb.size
    imgb = Image.new("RGB", size, (255, 255, 255))
    imgr = Image.new("RGB", size, (255, 255, 255))
    for x in range(size[0]):
        for y in range(size[1]):
            r, g, b = img_rgb.getpixel((x, y))
            if g == 0 and b == 0:
                if r == 0:
                    imgb.putpixel((x, y), (0, 0, 0))
                elif r == 255:
                    imgr.putpixel((x, y), (0, 0, 0))
    return (imgb, imgr)

def generate_image(epddata):
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
        img.save(buffer, format="png")
    return buffer

def draw(epddata):
    buffer = generate_image(epddata)
    img = Image.open(buffer)
    b, r = split_black_red(img)
    epd.init()
    epd.display(epd.getbuffer(b), epd.getbuffer(r))
    epd.sleep()
    return base64.b64encode(buffer.getvalue()).decode("utf-8")

def state():
    try:
        epddata = read_epddata()
        imgb64 = base64.b64encode(generate_image(epddata).getvalue()).decode("utf-8")
        return jsonify({ "status": True, "data": epddata, "image": imgb64 })
    except Exception as e:
        return jsonify({ "status": False, "message": "State error!\n" + str(e) + "\n" + traceback.format_exc() }), 500

def preview():
    try:
        epddata = read_epddata()
        if "image" in request.json:
            epddata["image"] = request.json["image"]
        if "texts" in request.json and isinstance(request.json["texts"], list):
            epddata["texts"] = request.json["texts"]
        imgb64 = base64.b64encode(generate_image(epddata).getvalue()).decode("utf-8")
        return jsonify({ "status": True, "image": imgb64 })
    except Exception as e:
        return jsonify({ "status": False, "message": "Preview error!\n" + str(e) + "\n" + traceback.format_exc() }), 500
