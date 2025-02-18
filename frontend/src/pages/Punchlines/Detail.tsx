import {useEffect, useMemo} from "react";
import {Container, Image, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>回答詳細</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2>
            回答タイトル
          </h2>
          <p>
            お題xxx
          </p>
          <div className="mb-5">
            <Image
              src={`https://picsum.photos/seed/${idNumber + 1}/270/480`}
            />
          </div>
          <Link to={`/punchline/post/${id}`}>
            <Button variant="primary">自分も回答する</Button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default PunchlinesDetail;
