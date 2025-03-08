import {useEffect, useMemo} from "react";
import {Container, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinesDetailApi} from "../../hooks/punchlinesApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";

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
          {canPost ? (
            <Link to={`/punchline/post/${id}`}>
              <Button variant="primary">自分も回答する</Button>
            </Link>
          ) : (
            <Button variant="primary" disabled>自分も回答する（期限切れです）</Button>
          )}
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
