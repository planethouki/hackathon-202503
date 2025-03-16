import {useEffect, useMemo} from "react";
import {Col, Container, Row, Button, Badge} from "react-bootstrap";
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
            <Row xs={1} md={2}>
              <Col>
                <div className="mb-3" style={{ maxWidth: 400 }}>
                  <ContestImage
                    fileName={contest.imageName}
                    alt={contest.title}
                  />
                </div>
              </Col>
              <Col>
                <div className="mb-4">
                  <h3 className="">
                    <span className="me-3">投稿</span>
                    {checkDateStatus(contest.postStartDate, contest.postEndDate) === "before" && <Badge bg="info">受付前</Badge>}
                    {checkDateStatus(contest.postStartDate, contest.postEndDate) === "now" && <Badge>受付中！</Badge>}
                    {checkDateStatus(contest.postStartDate, contest.postEndDate) === "after" && <Badge bg="secondary">終了</Badge>}
                  </h3>
                  <div>
                    開始: {new Date(contest.postStartDate).toLocaleString()}
                  </div>
                  <div>
                    終了: {new Date(contest.postEndDate).toLocaleString()}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="">
                    <span className="me-3">投票</span>
                    {checkDateStatus(contest.pollStartDate, contest.pollEndDate) === "before" && <Badge bg="info">投票前</Badge>}
                    {checkDateStatus(contest.pollStartDate, contest.pollEndDate) === "now" && <Badge>投票中！</Badge>}
                    {checkDateStatus(contest.pollStartDate, contest.pollEndDate) === "after" && <Badge bg="success">結果発表中！</Badge>}
                  </h3>
                  <div>
                    開始: {new Date(contest.pollStartDate).toLocaleString()}
                  </div>
                  <div>
                    終了: {new Date(contest.pollEndDate).toLocaleString()}
                  </div>
                </div>
                <div className="mb-4 h3">
                  <span className="me-1">投稿数:</span>
                  {contest.punchlineCount}
                </div>
              </Col>
            </Row>
          </>}
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <h2 className="mb-5">新着投稿</h2>
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {punchlines?.map((p) => (
              <Col key={p.id}>
                <PunchlineCard punchline={p} showContest={false} />
              </Col>
            ))}
            {punchlines?.length === 0 && <p>投稿はありません。</p>}
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
