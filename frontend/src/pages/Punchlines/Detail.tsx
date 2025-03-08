import {useEffect, useMemo, useCallback, useState} from "react";
import {Container, Button, ButtonGroup, Image} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinesDetailApi} from "../../hooks/punchlinesApi.ts";
import {usePollPostCall} from "../../hooks/pollPostApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import {Development} from "../../components/Development.tsx";

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, punchline } = usePunchlinesDetailApi(id);
  const { isLoading: isSending, send, error: sendError } = usePollPostCall();

  const [showSentSuccess, setShowSentSuccess] = useState(false);
  const [showSentError, setShowSentError] = useState<boolean>(false);

  useEffect(() => {
    if (!showSentSuccess) {return}
    const timeout = setTimeout(() => setShowSentSuccess(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSentSuccess, setShowSentSuccess]);

  useEffect(() => {
    if (!showSentError) {return}
    const timeout = setTimeout(() => setShowSentError(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSentError, setShowSentError]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchlines/latest");
    }
  }, [id]);

  const canPost = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.postStartDate);
    const end = new Date(punchline.contest.postEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const canPoll = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.pollStartDate);
    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const submitPoll = useCallback(async (emoji: string) => {
    if (id === undefined) {
      return;
    }

    const {success} = await send(id, emoji);
    if (success) {
      setShowSentSuccess(true);
    } else {
      setShowSentError(true);
    }
  }, [id, send]);

  if (!id) {
    return null;
  }

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
          {isLoading && <LoadingBlock />}
          {punchline?.contest && (
            <p>
              お題: <Link to={`/contests/${punchline.contest.id}`}>{punchline.contest.title}</Link>
            </p>
          )}
          <h2>
            {punchline?.title}
          </h2>
          <div className="mb-5" style={{ maxWidth: 320 }}>
            <iframe src={punchline?.url}
                    style={{ aspectRatio: 9/16, width: "100%" }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
          </div>
          <div className="mb-5">
            {canPost ? (
              <Link to={`/punchline/post/${id}`}>
                <Button variant="primary">自分も回答する</Button>
              </Link>
            ) : (
              <Button variant="primary" disabled>自分も回答する（期限切れです）</Button>
            )}
          </div>
          <div className="mb-5">
            <h3>投票する</h3>
            {canPoll ? (
              <>
                <ButtonGroup as="div">
                  {[1,2,3,4].map((emoji) => (
                    <Button
                      variant="outline-primary"
                      style={{ maxWidth: 100 }}
                      onClick={() => submitPoll(emoji.toString())}
                      disabled={isSending}
                    >
                      <Image src={`/emoji${emoji}.jpg`} alt={`絵文字${emoji}`} className="w-100" />
                    </Button>
                  ))}
                </ButtonGroup>
              </>
            ) : (
              <span>投票の期間は終了しました。</span>
            )}
          </div>
          <div className="mb-5">
            {showSentSuccess &&
              <span>投票しました！</span>
            }
            {showSentError &&
              <span>{sendError}</span>
            }
          </div>
        </Container>
      </div>

      <Development>
        <div>投稿: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>投票: {punchline?.contest?.postStartDate} - {punchline?.contest?.postEndDate}</div>
      </Development>
    </>
  );
}

export default PunchlinesDetail;
