import {Card, Container, Row, Col, Button, Placeholder} from "react-bootstrap";
import { Link } from "react-router";
import { useHomeApi } from "../hooks/homeApi.ts";
import {PunchlineCard} from "../components/PunchlineCard.tsx";
import {Avatar} from "../components/Avatar.tsx";
import {LoadingBlock} from "../components/Loading.tsx";
import {ContestImage} from "../components/ContestImage.tsx";

function Home() {
  const {
    contests,
    users,
    punchlines,
    isLoading,
  } = useHomeApi();

  return (
    <>
      <div className="mt-5 mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
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
                <Col key={p.id}>
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
          <Row xs={"auto"} className="g-4" style={{ maxHeight: 172, overflowY: "hidden" }}>
            {users && users.map((u) => (
              <Col key={u.id}>
                <Card className="text-center">
                  <Link to={`/users/${u.id}/profile`}>
                    <span
                      className="d-inline-block px-1"
                      style={{
                        width: "90px",
                        height: "90px"
                      }}
                    >
                      <Avatar fileName={u.avatarFileName} />
                    </span>
                  </Link>
                  <Card.Body className="px-1">
                    <Card.Text>
                      <Link to={`/users/${u.id}/profile`}>
                        {u.displayName}
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {!users && Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
              <Col key={i}>
                <Card className="text-center">
                  <span
                    className="d-inline-block px-1"
                    style={{
                      width: "90px",
                      height: "90px"
                    }}
                  >
                  </span>
                  <Card.Body className="px-1">
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={12} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </Col>
            )}
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
                    <ContestImage fileName={c.imageName} alt={c.title} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/contests/${c.id}`} >
                        {c.title}
                      </Link>
                    </Card.Title>
                    {c.punchlineCount !== undefined &&
                      <Card.Text className="small">
                      <span title={`動画数: ${c.punchlineCount}`}>
                        <i className="bi bi-camera-video me-1"></i>
                        <span>{c.punchlineCount}</span>
                      </span>
                      </Card.Text>
                    }
                  </Card.Body>
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
