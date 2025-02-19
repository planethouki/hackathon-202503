import {useState} from "react";
import {Container, Button, Row, Col, Card} from "react-bootstrap";
import {Link} from "react-router";
import {initialPunchlines, initialContests} from "../../mock.ts";

function PunchlinesLatest() {
  const [count, setCount] = useState(4);

  const more = () => {
    setCount((prev) => prev + 4);
  }

  return (
    <>
      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着回答</h2>
          </div>
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {initialPunchlines.filter((p) => p.id <= count).map((p) => (
              <Col key={p.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <span>回答: </span>
                      <Link to={`/punchlines/${p.id}`}>
                        {p.title}
                      </Link>
                    </Card.Title>
                  </Card.Body>
                  <iframe src={p.url}
                          style={{ aspectRatio: 9/16, width: "100%" }}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen></iframe>
                  <Card.Footer>
                    {initialContests.filter((c) => c.id === p.contestId).filter((_, i) => i === 0).map((c) => (
                      <>
                        <div className="mb-3">
                          <span>お題: </span>
                          <Link to={`/contests/${c.id}`}>
                            {c.title}
                          </Link>
                        </div>
                      </>
                    ))}
                  </Card.Footer>
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
