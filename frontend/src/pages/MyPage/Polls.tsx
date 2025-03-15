import {useEffect, useState, useMemo} from "react";
import {Link} from "react-router";
import {Alert, Button, Container, Image, Spinner} from "react-bootstrap";
import { useAuth } from "../../AuthProvider.tsx";
import {useUserPollsApi} from "../../hooks/usersApi.ts";
import PaginationComponent from "../../components/PaginationComponent";

function MyPage() {
  const { loading } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, totalPolls, polls, fetchPage, error } = useUserPollsApi();

  const maxPage = useMemo(() => {
    return totalPolls ? Math.ceil(totalPolls / 4) : 1;
  }, [totalPolls]);

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
            投票履歴
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
            {polls && (
              polls.map((p) => {
                return (
                  <div className="mb-1">
                    <span className="me-3">
                      <Link to={`/punchlines/${p.punchlineId}`} className="">
                        投稿
                      </Link>
                    </span>
                    <span className="me-3">
                      <Image src={`/emoji${p.emoji}.jpg`} alt={`絵文字${p.emoji}`} style={{ width: 20 }} />
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
