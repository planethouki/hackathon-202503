import {useEffect, FormEvent} from "react";
import {Container, Image, Form, Button} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";
import {usePunchlinePostContestDetailApi} from "../../../hooks/punchlinePostApi.ts";
import {LoadingBlock} from "../../../components/Loading.tsx";

function PunchlinePostDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const {isLoading, contest} = usePunchlinePostContestDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/punchline/post/${id}/confirm`);
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
          {isLoading && <LoadingBlock />}
          <h2 className="mb-5">
            お題 {contest?.title}
          </h2>
          <Image
            src={contest?.imageUrl}
            className="mb-5"
          />
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
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="キャッチーなタイトル"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>YouTube ShortsのURL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://youtube.com/shorts/M0xy9bGhn4Y?feature=shared"
                required
              />
            </Form.Group>
            <Form.Check
              className="mb-3"
              type="checkbox"
              id="exampleForm.ControlCheckbox1"
              label="私はこの動画に関するすべての権利を保有しています。"
              required
            />
            <Button variant="primary" type="submit">確認</Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostDetail;
