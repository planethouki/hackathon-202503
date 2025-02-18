import {useEffect, useMemo} from "react";
import {Container, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {initialPunchlines, initialContests} from "../../mock.ts";

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);
  const punchline = useMemo(() => {
    const f = initialPunchlines.filter((p) => p.id === idNumber);
    if (f.length === 0) {
      return null;
    }
    return f[0];
  }, [idNumber]);
  const contest = useMemo(() => {
    if (punchline === null) {
      return null;
    }
    const f = initialContests.find((c) => c.id === punchline.id);
    if (f === undefined) {
      return null;
    }
    return f;
  }, [punchline]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id]);

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
          <p>
            お題: <Link to={`/contests/${contest?.id}`}>{contest?.title}</Link>
          </p>
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
          <Link to={`/punchline/post/${id}`}>
            <Button variant="primary">自分も回答する</Button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default PunchlinesDetail;
