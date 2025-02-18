import {Card, Col, Container, Row} from "react-bootstrap";
import { Link } from "react-router";

function PunchlinePost() {

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>お題リスト</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <Row xs={1} sm={2} md={4} className="g-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Col key={index}>
                <Card>
                  <Link to={`/punchline/post/${index}`}>
                    <Card.Img
                      variant="top"
                      src={`https://picsum.photos/seed/${index + 1}/200/200`}
                      alt={`Card image ${index + 1}`}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>お題 {index + 1}</Card.Title>
                    <Card.Text>
                      これはカードの説明文です。お題その {index + 1} をぜひ確認してください。
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>回答数 999{index}</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePost;
