import {useEffect} from "react";
import {Col, Container, Image, Row, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {useContestsDetailApi} from "../../hooks/contestsApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import PunchlineCard from "../../components/PunchlineCard.tsx";

function ContestsDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, contest, punchlines } = useContestsDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id]);

  if (!id) {
    return null;
  }

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
          {isLoading && <LoadingBlock />}
          <h2 className="mb-5">
            {contest?.title}
          </h2>
          <Image
            src={contest?.imageUrl}
            className="mb-5"
          />
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <h2 className="mb-5">新着回答</h2>
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {punchlines?.map((p) => (
              <Col key={p.id}>
                <PunchlineCard punchline={p} showContest={false} />
              </Col>
            ))}
          </Row>
          <Link to={`/punchline/post/${id}`}>
            <Button variant="primary">私も回答する</Button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default ContestsDetail;
