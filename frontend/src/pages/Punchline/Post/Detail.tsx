import {useEffect, useState, FormEvent, useMemo} from "react";
import {Container, Form, Button, Breadcrumb} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinePostContestDetailApi} from "../../../hooks/punchlinePostApi.ts";
import {useTitleYouTubeContext} from "../../../contexts/TitleYouTubeContext";
import {ContestImage} from "../../../components/ContestImage.tsx";

function PunchlinePostDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const [validated, setValidated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { title, setTitle, youTubeUrl, setYouTubeUrl } = useTitleYouTubeContext();

  const {contest} = usePunchlinePostContestDetailApi(id);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item as="span" linkAs="span">
              <Link to="/">ホーム</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item as="span" linkAs="span">
              <Link to="/punchline/post">投稿する</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item as="span" linkAs="span" active>
              詳細入力
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1>詳細入力</h1>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          <h2 className="mb-3">
            投稿
          </h2>
          {contest &&
            <div className="mb-3">
              <div className="mb-3">
                お題: {contest.title}
              </div>
              <div style={{ maxWidth: 200 }}>
                <ContestImage
                  fileName={contest.imageName}
                  alt={contest.title}
                />
              </div>
            </div>
          }
          {canPost &&
            <Form onSubmit={onSubmit} onChange={onChange} className="mb-3">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>タイトル</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="例：ふとんが吹っ飛んだww"
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
          }
          {!canPost &&
            <div className="mb-5">
              投稿期限を過ぎています。
            </div>
          }
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostDetail;
