import {Button, Card, Col, Container, Row} from "react-bootstrap";
import { Link } from "react-router";
import {initialContests} from "../../mock.ts";

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
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {initialContests.filter((c) => c.id <= 8).map((c) => (
              <Col key={c.id}>
                <Card>
                  <Link to={`/punchline/post/${c.id}`} >
                    <Card.Img
                      variant="top"
                      src={`https://picsum.photos/seed/${c.imageNumber}/400/400`}
                      alt={`Card image ${c.imageNumber}`}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{c.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>回答数 999</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <Button variant="primary">
            別のお題（未実装）
          </Button>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePost;
