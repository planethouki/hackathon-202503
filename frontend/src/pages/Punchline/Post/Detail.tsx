import {useEffect, useState, FormEvent, useMemo} from "react";
import {Container, Image, Form, Button} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";
import {usePunchlinePostContestDetailApi} from "../../../hooks/punchlinePostApi.ts";
import {LoadingBlock} from "../../../components/Loading.tsx";
import {useTitleYouTubeContext} from "../../../contexts/TitleYouTubeContext";

function PunchlinePostDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const [validated, setValidated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { title, setTitle, youTubeUrl, setYouTubeUrl } = useTitleYouTubeContext();

  const {isLoading, contest} = usePunchlinePostContestDetailApi(id);

  useEffect(() => {
    window.scrollTo(0, 0);

    setTitle("");
    setYouTubeUrl("");
  }, []);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  const canPost = useMemo(() => {
    if (!contest) {
      return false;
    }

    const start = new Date(contest.postStartDate);
    const end = new Date(contest.postEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [contest]);

  const onChange = (e: FormEvent<HTMLFormElement>)=> {
    const form = e.currentTarget;
    setValidated(form.checkValidity());
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/punchline/post/${id}/confirm`);
  }

  function Expired() {
    return (
      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <div className="mb-5">
            回答期限を過ぎています。
          </div>
        </Container>
      </div>
    );
  }

  function PostForm() {
    return (
      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-5">
            回答
          </h2>
          <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>タイトル</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="キャッチーなタイトル"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>YouTube ShortsのURL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://youtube.com/shorts/M0xy9bGhn4Y?feature=shared"
                required
                pattern="https://.+"
                value={youTubeUrl}
                onChange={(e) => setYouTubeUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Check
              className="mb-3"
              type="checkbox"
              id="exampleForm.ControlCheckbox1"
              label="私はこの動画に関するすべての権利を保有しています。"
              required
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <Button variant="primary" type="submit" disabled={!validated}>確認</Button>
          </Form>
        </Container>
      </div>
    );
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

      {canPost ? <PostForm /> : <Expired />}
    </>
  );
}

export default PunchlinePostDetail;
