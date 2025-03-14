import {useEffect, useMemo, useCallback, useState} from "react";
import {Container, Button, ButtonGroup, Image, Spinner} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinesDetailApi} from "../../hooks/punchlinesApi.ts";
import {usePollPostCall} from "../../hooks/pollPostApi.ts";
import {usePollInfoGetCall} from "../../hooks/pollPostApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import {Development} from "../../components/Development.tsx";

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, punchline, refresh: refreshPunchline } = usePunchlinesDetailApi(id);
  const { isLoading: isSending, send, error: sendError } = usePollPostCall();
  const { poll, alreadyPolled, refresh: refreshPollInfo, error: pollInfoError } = usePollInfoGetCall(id);

  const [showSentSuccess, setShowSentSuccess] = useState(false);
  const [showSentError, setShowSentError] = useState(false);

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

  const inInPostPeriod = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.postStartDate);
    const end = new Date(punchline.contest.postEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const isInPollPeriod = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.pollStartDate);
    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const disabledPoll = useMemo(() => {
    if (isSending) return true;
    if (alreadyPolled === null) return true;
    return alreadyPolled;
  }, [alreadyPolled, isSending]);

  const BlockchainAddress = useMemo(() => {
    if (!punchline) {
      return <Spinner />;
    }
    const t = import.meta.env.VITE_BLOCK_EXPLORER_ADDRESS as string;
    const href = t.replace("{address}", punchline.pollAddress);
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {punchline.pollAddress}
      </a>
    );
  }, [punchline]);

  const isPolledEmoji = useCallback((emoji: string) => {
    if (poll === null) return false;
    return poll.emoji === emoji;
  }, [poll]);

  const submitPoll = async (emoji: string) => {
    if (id === undefined) {
      return;
    }

    const {success} = await send(id, emoji);
    if (success) {
      setShowSentSuccess(true);
    } else {
      setShowSentError(true);
    }
    await refreshPollInfo();
    await refreshPunchline();
  };

  if (!id) {
    return null;
  }

  if (!punchline) {
    return (
      <div className="mt-5 mb-5">
        <Container>
          <Spinner />
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <h1>投稿動画詳細</h1>
        </Container>
      </div>

      <div className="mb-1 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {isLoading && <LoadingBlock />}
          {punchline.contest && (
            <p>
              お題: <Link to={`/contests/${punchline.contest.id}`}>{punchline.contest.title}</Link>
            </p>
          )}
          <h2>
            {punchline.title}
          </h2>
          <div className="mb-3" style={{ maxWidth: 320 }}>
            <iframe src={punchline.url}
                    style={{ aspectRatio: 9/16, width: "100%" }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
          </div>
          <div className="mb-5">
            {punchline.user &&
              <p>
                投稿者: <Link to={`/users/${punchline.user.id}/profile`}>{punchline.user.displayName}</Link>
              </p>
            }
            <p>
              得票数: {punchline.pollCount}
            </p>
            <p>
              <span>順位: {punchline.rankingInContest}</span>
              {punchline.contest &&
                <>
                  <span> / </span>
                  <span>{punchline.contest.punchlineCount}</span>
                </>
              }
            </p>
            <p>
              投稿日時: {new Date(punchline.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mb-5">
            {inInPostPeriod ? (
              <Link to={`/punchline/post/${punchline.contestId}`}>
                <Button variant="primary">自分も投稿する</Button>
              </Link>
            ) : (
              <Button variant="primary" disabled>自分も投稿する（期限切れです）</Button>
            )}
          </div>
        </Container>
      </div>

      <div className="mb-5 py-5" style={{ backgroundColor: "#fffacd" }}>
        <Container>
          <div className="mb-5">
            <h3>投票する</h3>
            {isInPollPeriod ? (
              <>
                <ButtonGroup as="div">
                  {[1,2,3,4].map((emoji) => (
                    <Button
                      key={emoji}
                      variant={isPolledEmoji(emoji.toString()) ? "primary" : "outline-primary"}
                      className="position-relative"
                      style={{ maxWidth: 100 }}
                      onClick={() => submitPoll(emoji.toString())}
                      disabled={disabledPoll}
                    >
                      <Image src={`/emoji${emoji}.jpg`} alt={`絵文字${emoji}`} className="w-100" />
                      {isPolledEmoji(emoji.toString()) &&
                        <span
                          className="position-absolute top-50 start-50 bold text-nowrap bg-primary rounded"
                          style={{ transform: "translate(-50%, -50%)" }}
                        >
                          投票済み
                        </span>
                      }
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
          <div className="mb-5">
            {alreadyPolled === true &&
              <span>すでに投票済みです</span>
            }
            {pollInfoError &&
              <span>{pollInfoError}</span>
            }
          </div>
          <div className="mb-5">
            <div>
              <span>ここに</span>
              <a
                href={import.meta.env.VITE_BLOCK_EXPLORER_TOKEN.replace("{token}", import.meta.env.VITE_POLL_TOKEN)}
                target="_blank"
                rel="noopener noreferrer"
              >
                投票トークン
              </a>
              <span>が集まります</span>
            </div>
            {BlockchainAddress}
          </div>
        </Container>
      </div>

      <Development>
        <div>投稿: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>投票: {punchline?.contest?.postStartDate} - {punchline?.contest?.postEndDate}</div>
        <div>投票情報: {JSON.stringify(poll)}</div>
        <div>投票済みか: {JSON.stringify(alreadyPolled)}</div>
        <div>投票先アドレス: {punchline?.pollAddress}</div>
      </Development>
    </>
  );
}

export default PunchlinesDetail;
