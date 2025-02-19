import {useEffect, useMemo} from "react";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {initialPunchlines, initialUsers} from "../../mock.ts";

function UsersDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);
  const user = useMemo(() => {
    const f = initialUsers.filter((u) => u.id === idNumber);
    if (f.length === 0) {
      return null;
    }
    return f[0];
  }, [idNumber]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id]);
  const punchlines = useMemo(() => {
    if (idNumber === null) {
      return [];
    }
    return initialPunchlines.filter((p) => p.userId === idNumber);
  }, [idNumber]);

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>プロフィール</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            {user?.name}
          </h2>
          <div className="mb-5" style={{ maxWidth: 320 }}>
            <Image
              roundedCircle
              src={`https://randomuser.me/api/portraits/lego/${user?.id}.jpg`}
            />
          </div>
          <div className="mb-5">
            {user?.bio}
          </div>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            回答一覧
          </h2>

          <Row xs={1} sm={2} md={4} className="g-4">
            {punchlines.sort(() => Math.random() - 0.5).filter((_, i) => i < 4).map((p) => (
              <Col key={p.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <span>回答: </span>
                      <Link to={`/punchlines/${p.id}`}>
                        {p.title}
                      </Link>
                    </Card.Title>
                  </Card.Body>
                  <iframe src={p.url}
                          style={{ aspectRatio: 9/16, width: "100%" }}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen></iframe>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UsersDetail;
