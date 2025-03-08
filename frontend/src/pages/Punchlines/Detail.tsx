import {useEffect, useMemo} from "react";
import {Container, Button, ButtonGroup, Image} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinesDetailApi} from "../../hooks/punchlinesApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import {Development} from "../../components/Development.tsx";

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, punchline } = usePunchlinesDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchlines/latest");
    }
  }, [id]);

  const canPost = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.postStartDate);
    const end = new Date(punchline.contest.postEndDate);
    const current = new Date();
    console.log(start, end, current);
    return start < current && current < end;
  }, [punchline]);

  const canPoll = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.pollStartDate);
    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    console.log(start, end, current);
    return start < current && current < end;
  }, [punchline]);

  if (!id) {
    return null;
  }

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>回答詳細</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {isLoading && <LoadingBlock />}
          {punchline?.contest && (
            <p>
              お題: <Link to={`/contests/${punchline.contest.id}`}>{punchline.contest.title}</Link>
            </p>
          )}
          <h2>
            {punchline?.title}
          </h2>
          <div className="mb-5" style={{ maxWidth: 320 }}>
            <iframe src={punchline?.url}
                    style={{ aspectRatio: 9/16, width: "100%" }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
          </div>
          <div className="mb-5">
            {canPost ? (
              <Link to={`/punchline/post/${id}`}>
                <Button variant="primary">自分も回答する</Button>
              </Link>
            ) : (
              <Button variant="primary" disabled>自分も回答する（期限切れです）</Button>
            )}
          </div>
          <div className="mb-5">
            {canPoll ? (
              <>
                <h3>投票する</h3>
                <ButtonGroup as="div">
                  <Button variant="outline-primary" style={{ width: 100 }}>
                    <Image src="/emoji1.jpg" alt="絵文字１" className="w-100" />
                  </Button>
                  <Button variant="outline-primary" style={{ width: 100 }}>
                    <Image src="/emoji2.jpg" alt="絵文字２" className="w-100" />
                  </Button>
                  <Button variant="outline-primary" style={{ width: 100 }}>
                    <Image src="/emoji3.jpg" alt="絵文字３" className="w-100" />
                  </Button>
                  <Button variant="outline-primary" style={{ width: 100 }}>
                    <Image src="/emoji4.jpg" alt="絵文字４" className="w-100" />
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <Button variant="primary" disabled>自分も回答する（期限切れです）</Button>
            )}
          </div>
        </Container>
      </div>

      <Development>
        <div>投稿: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>投票: {punchline?.contest?.postStartDate} - {punchline?.contest?.postEndDate}</div>
      </Development>
    </>
  );
}

export default PunchlinesDetail;
