import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";
import { useHomeApi } from "../hooks/homeApi.ts";
import PunchlineCard from "../components/PunchlineCard.tsx";
import {Avatar} from "../components/Avatar.tsx";
import {LoadingBlock} from "../components/Loading.tsx";

function Home() {
  const {
    contests,
    users,
    punchlines,
    isLoading,
  } = useHomeApi();

  return (
    <>
      <div className="mt-5 mb-5">
        <Container>
          <h1>トップ</h1>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着面白動画</h2>
            <div>
              <Link to="/punchlines/latest">
                <Button as="span" variant="primary" href="/punchlines/latest">もっと見る</Button>
              </Link>
            </div>
          </div>
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4">
            {punchlines?.map((p) => {
              return (
                <Col id={p.id}>
                  <PunchlineCard punchline={p} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{backgroundColor: "#fffacd"}}>
        <Container>
          <h2 className="mb-5">新着芸人</h2>
          {isLoading && <LoadingBlock />}
          <Row xs={"auto"} className="g-4">
            {users?.map((u) => (
              <Col key={u.id}>
                <Card style={{ textAlign: "center", cursor: "pointer" }}>
                  <Link to={`/users/${u.id}/profile`}>
                    <span
                      className="d-inline-block"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        margin: "10px auto",
                      }}
                    >
                      <Avatar fileName={u.avatarFileName} />
                    </span>
                  </Link>
                  <Card.Body>
                    <Card.Title>{u.displayName}</Card.Title>
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
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4">
            {contests?.map((c) => (
              <Col key={c.id}>
                <Card>
                  <Link to={`/contests/${c.id}`} >
                    <Card.Img
                      variant="top"
                      src={c.imageUrl}
                      alt={`Card image ${c.title}`}
                      style={{ cursor: "pointer", width: '100%', aspectRatio: 1 }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{c.title}</Card.Title>
                  </Card.Body>
                  {c.punchlineCount !== undefined &&
                    <Card.Footer>回答数 {c.punchlineCount}</Card.Footer>
                  }
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
