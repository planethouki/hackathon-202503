import {useEffect, useMemo} from "react";
import {Col, Container, Image, Row, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {initialContests, initialPunchlines} from "../../mock.ts";

function ContestsDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);
  const contest = useMemo(() => {
    const f = initialContests.filter((c) => c.id === idNumber);
    if (f.length === 0) {
      return null;
    }
    return f[0];
  }, [idNumber]);
  const punchlines = useMemo(() => {
    return initialPunchlines.filter((p) => p.contestId === idNumber);
  }, [idNumber]);

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
            <h1>お題詳細</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            {contest?.title}
          </h2>
          <Image
            src={`https://picsum.photos/seed/${contest?.imageNumber}/600/600`}
            className="mb-5"
          />
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <h2 className="mb-5">新着回答</h2>
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {punchlines.map((p) => (
              <Col key={p.id}>
                <p>
                  <Link to={`/punchlines/${p.id}`}>
                    {p.title}
                  </Link>
                </p>
                <iframe src={p.url}
                        style={{ aspectRatio: 9/16, width: "100%" }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
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
