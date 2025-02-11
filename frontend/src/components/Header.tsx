import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
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
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ロゴ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              回答する
            </Nav.Link>
            <Nav.Link as={Link} to="/neta/new">
              お題を出す
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
