import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./style.scss";

const MainNav = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contacts</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNav;
