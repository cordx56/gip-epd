import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../common";

const SendImage = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const send = () => {
    axios
      .post(API_BASE_URL + "/image/" + name, { image: image })
      .then(() => {
        alert("Successfully uploaded\nReload this page");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onFileChange = (e) => {
    if (e.target.files.length != 1) return;
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onload = (e) => {
      setImage(String(e.target.result).split(",")[1]);
    };
    fr.readAsDataURL(file);
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control value={name} onChange={onNameChange} />
        </Form.Group>
        <Form.Group>
          <Form.File onChange={onFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload Image
        </Button>
      </Form>
    </>
  );
};

export default SendImage;
