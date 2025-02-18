import {useState} from "react";
import {Container, Button, Row, Col, Card} from "react-bootstrap";
import {Link} from "react-router";

function PunchlinesLatest() {
  const [count, setCount] = useState(8);

  const more = () => {
    setCount((prev) => prev + 8);
  }

  return (
    <>
      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着回答</h2>
          </div>
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {Array.from({ length: count }).map((_, index) => (
              <Col key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/contests/${Math.floor(Math.random() * 100)}`}>
                        お題 {Math.floor(Math.random() * 100)}
                      </Link>
                    </Card.Title>
                    <Card.Text>
                      ここにはお題のテキストが入ります
                    </Card.Text>
                  </Card.Body>
                  <Link to={`/punchlines/${index}`}>
                    <Card.Img
                      variant="bottom"
                      src={`https://picsum.photos/seed/${index}/400/400`}
                      alt={`Card image ${index}`}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          <div>
            <Button variant="primary" onClick={more}>
              もっと見る
            </Button>
          </div>
        </Container>
      </div>

    </>
  );
}

export default PunchlinesLatest;
