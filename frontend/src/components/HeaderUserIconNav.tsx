import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

const HeaderUserIconNav: React.FC = () => {
  return (
    <Nav>
      <NavDropdown
        title={
          <i className="bi bi-emoji-smile" style={{ fontSize: '2rem' }}></i>
        }
        id="user-dropdown"
        align="end"
      >
        <NavDropdown.Item as={Link} to="/mypage">
          マイページ
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/logout">
          ログアウト
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default HeaderUserIconNav;
