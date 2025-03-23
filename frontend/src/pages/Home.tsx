import {Card, Container, Row, Col, Button, Placeholder} from "react-bootstrap";
import { Link } from "react-router";
import { useHomeApi } from "../hooks/homeApi.ts";
import {PunchlineCard, PunchlineCardPlaceholder} from "../components/PunchlineCard.tsx";
import {Avatar} from "../components/Avatar.tsx";
import {ContestCard, ContestCardPlaceholder} from "../components/ContestCard.tsx";
import {TutorialModal} from "../components/TutorialModal.tsx";

function Home() {
  const {
    contests,
    users,
    punchlines,
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
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着お題</h2>
            <div>
              <Link to="/contests/latest">
                <Button as="span" variant="primary" href="/contests/latest">もっと見る</Button>
              </Link>
            </div>
          </div>
          <Row xs={2} sm={3} md={4} className="g-4">
            {contests && contests.map((c) => (
              <Col key={c.id}>
                <ContestCard contest={c} />
              </Col>
            ))}
            {!contests && Array.from({length: 8}, (_, i) => i + 1).map((i) =>
              <Col key={i}>
                <ContestCardPlaceholder />
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <TutorialModal />
    </>
  );
}

export default Home;
