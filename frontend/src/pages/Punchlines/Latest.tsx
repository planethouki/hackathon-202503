import {useState} from "react";
import {Container, Button, Row, Col, Card} from "react-bootstrap";
import {Link} from "react-router";
import {usePunchlinesLatestApi} from "../../hooks/punchlinesApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";

function PunchlinesLatest() {
  const [pageNumber, setPageNumber] = useState(1);
  const { punchlines, isLoading } = usePunchlinesLatestApi(pageNumber);

  const more = () => {
    setPageNumber((prev) => prev + 1);
  }


  return (
    <>
      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着回答</h2>
          </div>
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {punchlines?.map((p) => (
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
                  <Card.Footer>
                    {p.contest && (
                      <div className="mb-3">
                        <span>お題: </span>
                        <Link to={`/contests/${p.contest.id}`}>
                          {p.contest.title}
                        </Link>
                      </div>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div>
            <Button variant="primary" onClick={more}>
              もっと見る（未実装）
            </Button>
          </div>
        </Container>
      </div>

    </>
  );
}

export default PunchlinesLatest;
