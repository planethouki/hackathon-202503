import {useEffect} from "react";
import {Container, Button, Row, Col, Card} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinePostContestsApi} from "../../../hooks/punchlinePostApi.ts";
import {LoadingBlock} from "../../../components/Loading.tsx";

function PunchlinePostComplete() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const {isLoading, contests} = usePunchlinePostContestsApi();

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>ありがとうございました</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <Link to={`/punchline/post`}>
            <Button variant="primary" className="me-3">他のお題を選ぶ</Button>
          </Link>
          <Link to="/">
            <Button variant="outline-primary">トップへ</Button>
          </Link>
        </Container>
      </div>


      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            こんなお題もどうですか
          </h2>
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
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostComplete;
