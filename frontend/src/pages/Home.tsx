import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";
import { initialPunchlines, initialContests, initialUsers } from "../mock.ts";

function Home() {
  return (
    <>
      <div className="mt-5 mb-5">
        <Container>
          <h1>トップページ</h1>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着回答</h2>
            <div>
              <Link to="/punchlines/latest">
                <Button variant="primary" href="/punchlines/latest">もっと見る</Button>
              </Link>
            </div>
          </div>
          <Row xs={1} sm={2} md={4} className="g-4">
            {initialPunchlines.sort(() => Math.random() - 0.5).filter((_, i) => i < 4).map((p) => (
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
                      <div className="mb-3" key={c.id}>
                        <span>お題: </span>
                        <Link to={`/contests/${c.id}`}>
                          {c.title}
                        </Link>
                      </div>
                    ))}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{backgroundColor: "#fffacd"}}>
        <Container>
          <h2 className="mb-5">新着作家</h2>
          <Row xs={"auto"} className="g-4">
            {initialUsers.sort(() => Math.random() - 0.5).map((u) => (
              <Col key={u.id}>
                <Card style={{ textAlign: "center", cursor: "pointer" }}>
                  <Link to={`/users/${u.id}/profile`}>
                    <Card.Img
                      variant="top"
                      src={`https://randomuser.me/api/portraits/lego/${u.id}.jpg`}
                      alt={`ユーザー ${u.id}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        margin: "10px auto",
                      }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{u.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">新着お題</h2>
          <Row xs={1} sm={2} md={4} className="g-4">
            {initialContests.sort(() => Math.random() - 0.5).filter((_, i) => i < 8).map((c) => (
              <Col key={c.id}>
                <Card>
                  <Link to={`/contests/${c.id}`} >
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
        </Container>
      </div>
    </>
  );
}

export default Home;
