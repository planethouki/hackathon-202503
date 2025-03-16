import {useState, useMemo} from "react";
import {Container, Row, Col, Spinner} from "react-bootstrap";
import {usePunchlinesLatestApi} from "../../hooks/punchlinesApi.ts";
import {PunchlineCard} from "../../components/PunchlineCard.tsx";
import PaginationComponent from "../../components/PaginationComponent";

function PunchlinesLatest() {
  const [pageNumber, setPageNumber] = useState(1);
  const { totalPunchlines, punchlines, isLoading } = usePunchlinesLatestApi(pageNumber);

  const maxPage = useMemo(() => {
    return totalPunchlines ? Math.ceil(totalPunchlines / 4) : 1;
  }, [totalPunchlines]);

  const handlePageChange = (number: number) => {
    setPageNumber(number);
  };

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <h1>新着面白動画</h1>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <PaginationComponent
            pageNumber={pageNumber}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
          />
          {isLoading && <Spinner />}
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {punchlines?.map((p) => (
              <Col key={p.id}>
                <PunchlineCard punchline={p} />
              </Col>
            ))}
          </Row>
          <PaginationComponent
            pageNumber={pageNumber}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
          />
        </Container>
      </div>
    </>
  );
}

export default PunchlinesLatest;
