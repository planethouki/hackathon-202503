import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <Container>
        <Row className="py-4">
          <Col md={4} className="text-center">
            <h5>メンバー</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">村人Ａ</a></li>
              <li><a href="#" className="text-white text-decoration-none">村人Ｂ</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>リンク</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">未定</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>フォロー</h5>
            <a href="#" className="text-white text-decoration-none mx-2">
              未定
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <small>© 2025 未定. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
