import {useEffect, useMemo} from "react";
import {Container, Image} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";
import {initialUsers} from "../../mock.ts";

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
        </Container>
      </div>
    </>
  );
}

export default UsersDetail;
