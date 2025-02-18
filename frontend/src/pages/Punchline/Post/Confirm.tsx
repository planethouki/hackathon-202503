import {useEffect, useMemo} from "react";
import {Container, Image, Form, Button} from "react-bootstrap";
import {useParams, useNavigate} from "react-router";

function PunchlinePostConfirm() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const idNumber = useMemo(() => Number(id), [id]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchline/post");
    }
  }, [id]);

  const handleClick = async () => {
    navigate(`/punchline/post/${idNumber}/complete`);
  }

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
          <h2 className="mb-5">
            お題 {idNumber + 1}
          </h2>
          <Image
            src={`https://picsum.photos/seed/${idNumber + 1}/600/600`}
            className="mb-5"
          />
          <div className="mb-5">
            これはお題の説明文です。お題その {idNumber + 1} をぜひ確認してください。
          </div>

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
              <div>YouTube ShortsのURL</div>
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
            <Button variant="primary" onClick={handleClick}>送信</Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default PunchlinePostConfirm;
