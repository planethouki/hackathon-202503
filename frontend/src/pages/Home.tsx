import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router";

function Home() {
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate("/");
  }

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
            {Array.from({ length: 8 }).map((_, index) => (
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
                      src={`https://picsum.photos/seed/${index + 1}/400/400`}
                      alt={`Card image ${index + 1}`}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#fffacd" }}>
        <Container>
          <h2>新着芸人</h2>
          <Row xs={"auto"} className="g-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Col key={index}>
                <Card style={{ textAlign: "center", cursor: "pointer" }} onClick={handleUserClick}>
                  <Card.Img
                    variant="top"
                    src={`https://randomuser.me/api/portraits/lego/${index + 1}.jpg`}
                    alt={`芸人 ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      margin: "10px auto",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>芸人 {index + 1}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2>新着お題</h2>
          <Row xs={1} sm={2} md={4} className="g-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Col key={index}>
                <Card>
                  <Link to={`/contests/${index}`} >
                    <Card.Img
                      variant="top"
                      src={`https://picsum.photos/seed/${index + 1}/400/400`}
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

export default Home;
