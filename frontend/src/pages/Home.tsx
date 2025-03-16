import {Card, Container, Row, Col, Button, Placeholder, Badge} from "react-bootstrap";
import { Link } from "react-router";
import { useHomeApi } from "../hooks/homeApi.ts";
import {PunchlineCard, PunchlineCardPlaceholder} from "../components/PunchlineCard.tsx";
import {Avatar} from "../components/Avatar.tsx";
import {ContestImage} from "../components/ContestImage.tsx";

function Home() {
  const {
    contests,
    users,
    punchlines,
  } = useHomeApi();

  const checkDateStatus = (start: string, end: string): "before" | "now" | "after" => {
    const now = Date.now();
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    if (now < startTime) {
      return "before";
    } else if (endTime < now) {
      return "after";
    }
    return "now";
  }

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
          <Row xs={1} sm={2} md={4} className="g-4">
            {punchlines && punchlines.map((p) => {
              return (
                <Col key={p.id}>
                  <PunchlineCard punchline={p} />
                </Col>
              )
            })}
            {!punchlines && Array.from({length: 4}, (_, i) => i + 1).map((i) =>
              <Col key={i}>
                <PunchlineCardPlaceholder />
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{backgroundColor: "#fffacd"}}>
        <Container>
          <h2 className="mb-5">新着芸人</h2>
          <div className="overflow-x-scroll text-nowrap pb-2">
            {users && users.map((u) => (
              <Card key={u.id} className="text-center d-inline-block mx-1" style={{ width: 92 }}>
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
            ))}
            {!users && Array.from({length: 12}, (_, i) => i + 1).map((i) =>
              <Card key={i} className="text-center d-inline-block mx-1" style={{ width: 92 }}>
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
            )}
          </div>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">新着お題</h2>
          <Row xs={2} sm={3} md={4} className="g-4">
            {contests && contests.map((c) => (
              <Col key={c.id}>
                <Card>
                  <div className="position-relative">
                    <Link to={`/contests/${c.id}`} >
                      <ContestImage fileName={c.imageName} alt={c.title} />
                    </Link>
                    <div className="position-absolute d-flex flex-column gap-2" style={{ bottom: 10, right: 10 }}>
                      {checkDateStatus(c.postStartDate, c.postEndDate) === "before" && <Badge bg="info">投稿受付前</Badge>}
                      {checkDateStatus(c.postStartDate, c.postEndDate) === "now" && <Badge>投稿受付中！</Badge>}
                      {checkDateStatus(c.pollStartDate, c.pollEndDate) === "before" && <Badge bg="info">投票前</Badge>}
                      {checkDateStatus(c.pollStartDate, c.pollEndDate) === "now" && <Badge>投票中！</Badge>}
                      {checkDateStatus(c.pollStartDate, c.pollEndDate) === "after" && <Badge bg="success">結果発表中！</Badge>}
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/contests/${c.id}`} >
                        {c.title}
                      </Link>
                    </Card.Title>
                    <Card.Text>
                      {c.punchlineCount !== undefined &&
                        <span className="small me-3" title={`動画数: ${c.punchlineCount}`}>
                          <i className="bi bi-camera-video me-1"></i>
                          <span>{c.punchlineCount}</span>
                        </span>
                      }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {!contests && Array.from({length: 8}, (_, i) => i + 1).map((i) =>
              <Col key={i}>
                <Card>
                  <span
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                    }}
                  >
                  </span>
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={12} />
                    </Placeholder>
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
    </>
  );
}

export default Home;
