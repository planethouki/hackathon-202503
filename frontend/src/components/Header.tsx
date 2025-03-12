import React from "react";
import {Navbar, Nav, Container, Button, Image} from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import HeaderUserIconNav from "./HeaderUserIconNav.tsx";
import { useAuth } from "../AuthProvider.tsx";

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar
      bg="light"
      variant="primary"
      expand="lg"
      sticky="top"
      className="border border-5 border-top-0 border-start-0 border-end-0 border-primary"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src="/logo.png" alt="logo" width={200} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/punchline/post">
              回答する
            </Nav.Link>
          </Nav>

          {!loading && (
            <>
              {user ? (
                <HeaderUserIconNav />
              ) : (
                <Button onClick={handleLogin}>ログイン・新規登録</Button>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
