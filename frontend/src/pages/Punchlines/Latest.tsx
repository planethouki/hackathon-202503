import {useState, useMemo} from "react";
import {Container, Row, Col, Pagination} from "react-bootstrap";
import {usePunchlinesLatestApi} from "../../hooks/punchlinesApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import PunchlineCard from "../../components/PunchlineCard.tsx";

function PunchlinesLatest() {
  const [pageNumber, setPageNumber] = useState(1);
  const { totalPunchlines, punchlines, isLoading } = usePunchlinesLatestApi(pageNumber);

  const maxPage = useMemo(() => {
    return totalPunchlines ? Math.ceil(totalPunchlines / 4) : 1;
  }, [totalPunchlines]);

  const handlePageChange = (number: number) => {
    setPageNumber(number);
  };

  function PaginationComponent() {
    return (
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={pageNumber === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        />
        {Array.from({ length: maxPage }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === pageNumber}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === maxPage}
        />
        <Pagination.Last
          onClick={() => handlePageChange(maxPage)}
          disabled={pageNumber === maxPage}
        />
      </Pagination>
    )
  }

  return (
    <>
      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <div className="mb-5 d-flex justify-content-between">
            <h2>新着回答</h2>
          </div>
          <PaginationComponent />
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {punchlines?.map((p) => (
              <Col key={p.id}>
                <PunchlineCard punchline={p} />
              </Col>
            ))}
          </Row>
          <PaginationComponent />
        </Container>
      </div>
    </>
  );
}

export default PunchlinesLatest;
