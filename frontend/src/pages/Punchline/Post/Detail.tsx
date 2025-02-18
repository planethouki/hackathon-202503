import {useEffect, useMemo, FormEvent} from "react";
import {Container, Image, Form, Button} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";

function PunchlinePostDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/punchline/post/${idNumber}/confirm`);
  }

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>お題詳細</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            お題 {idNumber + 1}
          </h2>
          <Image
            src={`https://picsum.photos/seed/${idNumber + 1}/600/600`}
            className="mb-5"
          />
          <div>
            これはお題の説明文です。お題その {idNumber + 1} をぜひ確認してください。
          </div>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            回答
          </h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>タイトル</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="キャッチーなタイトル" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>YouTube ShortsのURL</Form.Label>
              <Form.Control type="text" placeholder="https://youtube.com/shorts/M0xy9bGhn4Y?feature=shared" />
            </Form.Group>
            <Form.Check
              className="mb-3"
              type="checkbox"
              id="exampleForm.ControlCheckbox1"
              label="私はこの動画に関するすべての権利を保有しています。"
            />
            <Button variant="primary" type="submit">確認</Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostDetail;
