import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  function Anchor({ href, children }: React.PropsWithChildren<{href: string}>) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <footer className="bg-light mt-5">
      <Container>
        <Row className="py-4">
          <Col md={4} className="text-center">
            <h5>メンバー</h5>
            <ul className="list-unstyled">
              <li>
                <Anchor href="https://x.com/begin_indiegame">
                  初川鳳一
                </Anchor>
              </li>
              <li>
                <Anchor href="https://x.com/planethouki">
                  planet★箒星
                </Anchor>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>リンク</h5>
            <ul className="list-unstyled">
              <li>
                <Anchor href="https://hackathon-2025.nemtus.com">
                  NEMTUS Hackathon 2025
                </Anchor>
              </li>
              <li>
                <Anchor href="https://github.com/planethouki/hackathon-202503">
                  GitHub
                </Anchor>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>未定</h5>
            <ul className="list-unstyled">
              <li>
                利用規約（未実装）
              </li>
              <li>
                プライバシーポリシー（未実装）
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <small>© 2025 ROFLoL. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
