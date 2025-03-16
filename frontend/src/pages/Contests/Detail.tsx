import {useEffect, useMemo} from "react";
import {Col, Container, Row, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {useContestsDetailApi} from "../../hooks/contestsApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import {PunchlineCard} from "../../components/PunchlineCard.tsx";
import {ContestImage} from "../../components/ContestImage.tsx";
import {checkDateStatus} from "../../components/utils.ts";

function ContestsDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, contest, punchlines } = useContestsDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id]);

  const canPost = useMemo(() => {
    if (!contest) return false;
    return checkDateStatus(contest.postStartDate, contest.postEndDate) === "now";
  }, [contest]);

  if (!id) {
    return null;
  }

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <h1>お題詳細</h1>
        </Container>
      </div>

      <div className="mb-1 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {isLoading && <LoadingBlock />}
          {contest && <>
            <h2 className="mb-5">
              {contest.title}
            </h2>
            <div style={{ maxWidth: 400 }}>
              <ContestImage
                fileName={contest.imageName}
                alt={contest.title}
              />
            </div>
          </>}
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
          {canPost &&
            <Link to={`/punchline/post/${id}`}>
              <Button variant="primary">私も回答する</Button>
            </Link>
          }
        </Container>
      </div>
    </>
  );
}

export default ContestsDetail;
