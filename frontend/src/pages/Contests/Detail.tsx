import {useEffect, useMemo} from "react";
import {Col, Container, Image, Row, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";

function ContestsDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);

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
            <h1>お題詳細</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            お題 {idNumber + 1}
          </h2>
          <Image
            src={`https://picsum.photos/seed/${idNumber + 1}/600/600`}
            className="mb-5"
          />
          <div>
            これはお題の説明文です。お題その {idNumber + 1} をぜひ確認してください。
          </div>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <h2 className="mb-5">新着回答</h2>
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <Col key={index}>
                <Link to={`/punchlines/${index}`}>
                  <Image
                    src={`https://picsum.photos/seed/${index + 1}/400/400`}
                    alt={`Card image ${index + 1}`}
                    className="w-100"
                    style={{ cursor: "pointer" }}
                    rounded
                  />
                </Link>
              </Col>
            ))}
          </Row>
          <Link to={`/punchline/post/${id}`}>
            <Button variant="primary">回答する</Button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default ContestsDetail;
