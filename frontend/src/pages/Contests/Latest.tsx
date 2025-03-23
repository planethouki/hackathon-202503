import {useState, useMemo, useEffect} from "react";
import {useSearchParams} from "react-router";
import {Container, Row, Col} from "react-bootstrap";
import {useContestsLatestApi} from "../../hooks/contestsApi.ts";
import PaginationComponent from "../../components/PaginationComponent";
import {ContestCard, ContestCardPlaceholder} from "../../components/ContestCard";

function ContestsLatest() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const [pageNumber, setPageNumber] = useState(initialPage);

  const { totalContests, contests } = useContestsLatestApi(pageNumber);
  const perPage = 8;

  const maxPage = useMemo(() => {
    return totalContests ? Math.ceil(totalContests / perPage) : 1;
  }, [totalContests]);

  const handlePageChange = (number: number) => {
    setPageNumber(number);
    setSearchParams({ page: number.toString() });
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setPageNumber(page);
  }, [searchParams]);

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <h1>新着お題</h1>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f0f8ff" }}>
        <Container>
          <PaginationComponent
            pageNumber={pageNumber}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
          />
          <Row xs={1} sm={2} md={4} className="g-4 mb-5">
            {!contests && Array.from({length: perPage}, (_, i) => i + 1).map((i) =>
              <Col key={i}>
                <ContestCardPlaceholder />
              </Col>
            )}
            {contests?.map((c) => (
              <Col key={c.id}>
                <ContestCard contest={c} />
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

export default ContestsLatest;
