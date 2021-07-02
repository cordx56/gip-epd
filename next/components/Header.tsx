import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>GIP EPD</Navbar.Brand>
        <Nav>
          <Nav.Link href="https://github.com/SIT-DigiCre/idrs-epd">
            Repository
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
