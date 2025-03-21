import {useEffect, useMemo, useState} from "react";
import {Container, Form, Button, Breadcrumb} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinePostContestDetailApi, usePunchlinePostCall} from "../../../hooks/punchlinePostApi.ts";
import {LoadingBlock} from "../../../components/Loading.tsx";
import {useTitleYouTubeContext} from "../../../contexts/TitleYouTubeContext";
import {ContestImage} from "../../../components/ContestImage.tsx";
import {extractYouTubeId} from "../../../libs/youTubeUtils.ts";

function PunchlinePostConfirm() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { title, youTubeUrl } = useTitleYouTubeContext();
  const {isLoading, contest} = usePunchlinePostContestDetailApi(id);
  const {isLoading: isSending, send, error: sendError} = usePunchlinePostCall();
  const youTubeEmbedUrl = useMemo(() => {
    return `https://www.youtube.com/embed/${extractYouTubeId(youTubeUrl)}`;
  }, [youTubeUrl]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!(title && youTubeUrl)) {
      navigate("/punchline/post");
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  const onClick = async () => {
    setError(null);
    if (!contest) {
      setError("お題の情報がロードされていません。");
      return;
    }
    const { success } = await send(title, youTubeEmbedUrl, contest.id);
    if (!success) {
      return;
    }
    navigate(`/punchline/post/${id}/complete`);
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
            <Breadcrumb.Item as="span" linkAs="span">
              <Link to={`/punchline/post/${id}`}>詳細入力</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item as="span" linkAs="span" active>
              確認
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1>投稿確認</h1>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {(isLoading || isSending) && <LoadingBlock />}
          {contest &&
            <div className="mb-5">
              <h2 className="mb-3">
                {contest.title}
              </h2>
              <div style={{ maxWidth: 100 }}>
                <ContestImage
                  fileName={contest.imageName}
                  alt={contest.title}
                />
              </div>
            </div>
          }

          <h2 className="mb-3">
            投稿
          </h2>
          <div>
            <div className="mb-3">
              <span>タイトル: </span>
              <span>{title}</span>
            </div>
            <div className="mb-3">
              <div>
                <iframe src={youTubeEmbedUrl}
                        style={{ aspectRatio: 9/16, width: "100%", maxWidth: 320 }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
              </div>
              <div>
                <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
                  {youTubeUrl}
                </a>
              </div>
            </div>
            <Form.Check
              className="mb-3"
              type="checkbox"
              id="exampleForm.ControlCheckbox1"
              label="私はこの動画に関するすべての権利を保有しています。"
              checked
              readOnly
            />
            <Button variant="primary" onClick={onClick} disabled={(isLoading || isSending)}>送信</Button>
            <div>
              {error}
            </div>
            <div>
              {sendError}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostConfirm;
