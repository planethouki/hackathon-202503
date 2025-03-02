import {useEffect} from "react";
import {Container, Image, Form, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinePostContestDetailApi} from "../../../hooks/punchlinePostApi.ts";
import {LoadingBlock} from "../../../components/Loading.tsx";
import {youTubeUrl} from "../../../mock.ts";

function PunchlinePostConfirm() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const {isLoading, contest} = usePunchlinePostContestDetailApi(id);

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
            <h1>回答確認</h1>
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

          <h2 className="mb-5">
            回答
          </h2>
          <div>
            <div className="mb-3">
              <div>タイトル</div>
              <div>
                キャッチーなタイトル
              </div>
            </div>
            <div className="mb-3">
              <div>
                <iframe src={youTubeUrl}
                        style={{ aspectRatio: 9/16, width: "100%", maxWidth: 320 }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
              </div>
              <div>
                <a href="https://youtube.com/shorts/M0xy9bGhn4Y?feature=shared" target="_blank" rel="noopener noreferrer">
                  https://youtube.com/shorts/M0xy9bGhn4Y?feature=shared
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
            <Link to={`/punchline/post/${id}/complete`}>
              <Button variant="primary">送信</Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostConfirm;
