import {useEffect} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";
import {useUsersDetailApi} from "../../hooks/usersApi.ts";
import {PunchlineCard} from "../../components/PunchlineCard.tsx";
import {Avatar} from "../../components/Avatar.tsx";

function UsersDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, user, punchlines } = useUsersDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id]);

  if (!id) {
    return null;
  }

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <h1>プロフィール</h1>
        </Container>
      </div>

      <div className="mb-1 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {isLoading && <Spinner />}
          {user && <>
            <h2 className="mb-5">
              {user.displayName}
            </h2>
            <div className="mb-5" style={{ maxWidth: 150 }}>
              <Avatar fileName={user.avatarFileName} />
            </div>
            <div className="mb-5">
              {user.bio || "自己紹介はありません。"}
            </div>
          </>}
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            投稿一覧
          </h2>
          {isLoading && <Spinner />}
          {punchlines &&
            <Row xs={1} sm={2} md={4} className="g-4">
              {punchlines.map((p) => (
                <Col key={p.id}>
                  <PunchlineCard punchline={p} showUser={false} />
                </Col>
              ))}
              {punchlines.length === 0 &&
                <Col>
                  投稿はありません。
                </Col>
              }
            </Row>
          }
        </Container>
      </div>
    </>
  );
}

export default UsersDetail;
