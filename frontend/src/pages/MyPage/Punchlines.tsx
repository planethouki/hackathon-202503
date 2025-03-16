import {useEffect, useState, useMemo} from "react";
import {Link} from "react-router";
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import { useAuth } from "../../AuthProvider.tsx";
import {useUserPunchlinesApi} from "../../hooks/usersApi.ts";
import PaginationComponent from "../../components/PaginationComponent";

function MyPage() {
  const { loading } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, totalPunchlines, punchlines, fetchPage, error } = useUserPunchlinesApi();

  const maxPage = useMemo(() => {
    return totalPunchlines ? Math.ceil(totalPunchlines / 4) : 1;
  }, [totalPunchlines]);

  const handlePageChange = (number: number) => {
    setPageNumber(number);
  };

  useEffect(() => {
    fetchPage(pageNumber);
  }, [fetchPage, pageNumber]);

  return (
    <>
      <div className="mt-5 mb-2 py-3 bg-light">
        <Container>
          <h1>
            投稿履歴
            <Link to="/mypage" className="d-inline-block ms-3">
              <Button
                size="sm"
                as="span"
                variant="outline-primary"
                href="/mypage"
              >
                戻る
              </Button>
            </Link>
          </h1>
        </Container>
      </div>

      <div className="mb-2 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {(isLoading || loading) && <Spinner />}
          <PaginationComponent
            pageNumber={pageNumber}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
          />
          <div className="mb-3">
            {punchlines && (
              punchlines.map((p) => {
                return (
                  <div key={p.id} className="mb-1">
                    <span className="me-3">
                      <Link to={`/punchlines/${p.id}`} className="">
                        {p.title}
                      </Link>
                    </span>
                    <span className="me-3">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        title="YouTube"
                      >
                        <i className="bi bi-camera-video"></i>
                      </a>
                    </span>
                    <span className="me-3">
                      <i className="bi bi-balloon-heart" title="投票数">{p.pollCount}</i>
                    </span>
                    <span className="me-3">
                      {new Date(p.createdAt).toLocaleString()}
                    </span>
                  </div>
                )
              })
            )}
          </div>
          {error &&
            <div className="mb-3">
              <Alert variant="danger">{error}</Alert>
            </div>
          }
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

export default MyPage;
