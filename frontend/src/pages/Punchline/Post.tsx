import {Button, Card, Col, Container, Row} from "react-bootstrap";
import { Link } from "react-router";
import {usePunchlinePostContestsApi} from "../../hooks/punchlinePostApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";

function PunchlinePost() {
  const {isLoading, contests, refresh} = usePunchlinePostContestsApi();

  const onClickRefresh = () => {
    refresh();
  }

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
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {contests?.map((c) => (
              <Col key={c.id}>
                <Card>
                  <Link to={`/punchline/post/${c.id}`} >
                    <Card.Img
                      variant="top"
                      src={c.imageUrl}
                      alt={`Card image`}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{c.title}</Card.Title>
                  </Card.Body>
                  {c.punchlineCount !== undefined &&
                    <Card.Footer>
                      回答数: {c.punchlineCount}
                    </Card.Footer>
                  }
                </Card>
              </Col>
            ))}
          </Row>
          <Button variant="primary" onClick={() => onClickRefresh()}>
            別のお題
          </Button>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePost;
