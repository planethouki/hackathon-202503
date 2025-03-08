import {Button, Col, Container, Row} from "react-bootstrap";
import { useAuth } from "../../AuthProvider.tsx";
import {LoadingBlock} from "../../components/Loading.tsx";
import PunchlineCard from "../../components/PunchlineCard.tsx";
import {useUsersDetailApi} from "../../hooks/usersApi.ts";
import {Link} from "react-router";
import {Avatar} from "../../components/Avatar.tsx";

function MyPage() {
  const { loading, user: authUser } = useAuth();

  const { isLoading, user, punchlines } = useUsersDetailApi(authUser?.uid);

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>マイページ</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            プロフィール
            <Link to="/mypage/profile/edit" className="d-inline-block ms-3">
              <Button
                size="sm"
                as="span"
                variant="outline-primary"
                href="/mypage/profile/edit"
              >
                編集
              </Button>
            </Link>
          </h2>
          {(isLoading || loading) && <LoadingBlock />}
          <div className="mb-5" style={{ maxWidth: 120 }}>
            <Avatar fileName={user?.avatarFileName} />
          </div>
          <div className="">
            ニックネーム: {user?.displayName ?? "未設定"}
          </div>
          <div className="mb-5">
            自己紹介: {user?.bio ?? "未設定"}
          </div>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            回答一覧
          </h2>
          {isLoading && <LoadingBlock />}
          <Row xs={1} sm={2} md={4} className="g-4">
            {punchlines?.map((p) => (
              <Col key={p.id}>
                <PunchlineCard punchline={p} showUser={false} />
              </Col>
            ))}
          </Row>
          {punchlines?.length === 0 &&
            <div>回答はありません</div>
          }
        </Container>
      </div>
    </>
  );
}

export default MyPage;
