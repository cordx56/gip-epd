import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../common";

const SendTexts = () => {
  const [receivedImage, setReceivedImage] = useState("");
  const [images, setImages] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const send = () => {
    const data = { image: selectedImage, texts: texts };
    setIsLoading(true);
    axios
      .post(API_BASE_URL + "/update", data)
      .then((response) => {
        console.log(response);
        setReceivedImage(response.data.image);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data.message);
        }
        setIsLoading(false);
      });
  };
  const getPreview = (data) => {
    axios
      .post(API_BASE_URL + "/preview", data)
      .then((response) => {
        console.log(response);
        setPreviewImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data.message);
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };
  const onImageSelectChange = (e) => {
    setSelectedImage(e.target.value);
    const data = { image: e.target.value, texts: texts };
    getPreview(data);
  };

  const addText = () => {
    const t = texts.concat();
    t.push({ x: 0, y: 0, size: 18, font: fonts[0], color: "Black", text: "" });
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const deleteText = (index) => {
    const t = texts.filter((text, i) => index !== i);
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const onXChange = (e, index) => {
    const t = texts.concat();
    t[index].x = e.target.value;
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const onYChange = (e, index) => {
    const t = texts.concat();
    t[index].y = e.target.value;
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const onSizeChange = (e, index) => {
    const t = texts.concat();
    t[index].size = e.target.value;
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const onFontChange = (e, index) => {
    const t = texts.concat();
    t[index].font = e.target.value;
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const onColorChange = (e, index) => {
    const t = texts.concat();
    t[index].color = e.target.value;
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };
  const onTextChange = (e, index) => {
    const t = texts.concat();
    t[index].text = e.target.value;
    setTexts(t);
    const data = { image: selectedImage, texts: t };
    getPreview(data);
  };

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/image")
      .then((response) => {
        setImages(response.data.data);
        setSelectedImage(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data.message);
        }
      });
    axios
      .get(API_BASE_URL + "/font")
      .then((response) => {
        setFonts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data.message);
        }
      });
    axios
      .get(API_BASE_URL + "/state")
      .then((response) => {
        setSelectedImage(response.data.data.image);
        setTexts(response.data.data.texts);
        setPreviewImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data.message);
        }
      });
  }, []);

  const imgStyle = {
    width: "80%",
  };
  return (
    <>
      <div>
        <h2>Preview</h2>
        <img src={"data:image/png;base64," + previewImage} style={imgStyle} />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            as="select"
            value={selectedImage}
            onChange={onImageSelectChange}
          >
            {images.map((image) => (
              <option key={image}>{image}</option>
            ))}
          </Form.Control>
        </Form.Group>
        {texts.map((text, index) => (
          <Card key={index}>
            <Card.Header>Text {index}</Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>x</Form.Label>
                  <Form.Control
                    type="number"
                    value={text.x}
                    onChange={(e) => onXChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>y</Form.Label>
                  <Form.Control
                    type="number"
                    value={text.y}
                    onChange={(e) => onYChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>size</Form.Label>
                  <Form.Control
                    type="number"
                    value={text.size}
                    onChange={(e) => onSizeChange(e, index)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Font</Form.Label>
                  <Form.Control
                    as="select"
                    value={text.font}
                    onChange={(e) => onFontChange(e, index)}
                  >
                    {fonts.map((font) => (
                      <option key={font}>{font}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    as="select"
                    value={text.color}
                    onChange={(e) => onColorChange(e, index)}
                  >
                    <option>Black</option>
                    <option>White</option>
                    <option>Red</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control
                  value={text.text}
                  onChange={(e) => onTextChange(e, index)}
                />
              </Form.Group>
              <Form.Group>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteText(index);
                  }}
                >
                  Delete
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
        <Form.Group>
          <Button variant="primary" onClick={addText}>
            Add Text
          </Button>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </Form>
      <div>
        <h2>Result</h2>
        <img src={"data:image/png;base64," + receivedImage} style={imgStyle} />
      </div>
    </>
  );
};

export default SendTexts;
