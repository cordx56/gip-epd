import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import SendTexts from "../components/SendTexts";
import SendImage from "../components/SendImage";

export default function Home() {
  return (
    <>
      <Head>
        <title>IDRS EPD</title>
      </Head>
      <Header />
      <Container>
        <h2>Update EPD</h2>
        <SendTexts />
        <h2>Upload Image</h2>
        <SendImage />
      </Container>
    </>
  );
}
