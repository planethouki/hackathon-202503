import {Button, Container} from "react-bootstrap";
import { useAuth } from "../../AuthProvider.tsx";
import {LoadingBlock} from "../../components/Loading.tsx";
import {useUsersDetailApi} from "../../hooks/usersApi.ts";
import {Link} from "react-router";
import {Avatar} from "../../components/Avatar.tsx";

function MyPage() {
  const { loading, user: authUser } = useAuth();

  const { isLoading, user } = useUsersDetailApi(authUser?.uid);

  return (
    <>
      <div className="mt-5 mb-2 py-3 bg-light">
        <Container>
          <h1>マイページ</h1>
        </Container>
      </div>

      <div className="mb-2 py-5" style={{ backgroundColor: "#f5fff5" }}>
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
          <div className="mb-5">
            <Link to="/mypage/punchlines" className="d-inline-block me-3">
              <Button
                as="span"
                variant="primary"
                href="/mypage/punchlines"
              >
                投稿履歴
              </Button>
            </Link>
            <Link to="/mypage/polls" className="d-inline-block me-3">
              <Button
                as="span"
                variant="primary"
                href="/mypage/polls"
              >
                投票履歴
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}

export default MyPage;
