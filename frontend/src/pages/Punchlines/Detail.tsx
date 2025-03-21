import {useEffect, useMemo} from "react";
import {Container, Spinner, Row, Col, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinesDetailApi} from "../../hooks/punchlinesApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import {Development} from "../../components/Development.tsx";
import {PollComponent} from "../../components/PollComponent.tsx";
import { Punchline } from "../../libs/interfaces.ts";

function DetailInfo({ punchline }: { punchline: Punchline }) {
  return (
    <>
      <div className="mb-5">
        <h2 className="mb-3">
          {punchline.title}
        </h2>
        {punchline.contest && (
          <p>
            お題: <Link to={`/contests/${punchline.contest.id}`}>{punchline.contest.title}</Link>
          </p>
        )}
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
    </>
  );
}

function OtherInfo({ punchline, isPollEnded }: { punchline: Punchline, isPollEnded: boolean }) {

  const inInPostPeriod = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.postStartDate);
    const end = new Date(punchline.contest.postEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const blockchainHref = useMemo(() => {
    const t = import.meta.env.VITE_BLOCK_EXPLORER_ADDRESS as string;
    return t.replace("{address}", punchline.pollAddress);
  }, [punchline]);

  const pollTokenHref = import.meta.env.VITE_BLOCK_EXPLORER_TOKEN.replace("{token}", import.meta.env.VITE_POLL_TOKEN)

  return (
    <div className="mb-5 py-5" style={{ backgroundColor: "#fffacd" }}>
      <Container>
        <div className="mb-5">
          <h3>その他情報</h3>
        </div>
        <div className="mb-5">
          <h5 className="mb-3">ブロックチェーン</h5>
          <div>
            <span>このアカウントに</span>
            <a
              href={pollTokenHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              投票トークン
            </a>
            <span>が集まります</span>
          </div>

          <a href={blockchainHref} target="_blank" rel="noopener noreferrer">
            {punchline.pollAddress}
          </a>

          {isPollEnded && (
            <div className="mt-3">
              <Link to={`/punchlines/${punchline.id}/withdraw`}>
                <Button>投票トークンを引き出す</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="mb-5">
          <h5 className="mb-3">投稿</h5>
          {inInPostPeriod ? (
            <Link to={`/punchline/post/${punchline.contestId}`}>
              <Button variant="primary">自分もこのお題に投稿する</Button>
            </Link>
          ) : (
            <Button variant="primary" disabled>投稿受付は終了しました</Button>
          )}
        </div>
      </Container>
    </div>
  );
}

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const { isLoading, punchline, refresh: refreshPunchline } = usePunchlinesDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchlines/latest");
    }
  }, [id]);

  const isInPollPeriod = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.pollStartDate);
    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const isPollEnded = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    return current > end;
  }, [punchline]);

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
          <Row xs={1} md={2}>
            <Col>
              <div className="mb-3 mx-auto" style={{ maxWidth: 320 }}>
                <iframe src={punchline.url}
                        style={{ aspectRatio: 9/16, width: "100%" }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
              </div>
            </Col>
            <Col>
              <DetailInfo punchline={punchline} />
              <div className="mb-5">
                <PollComponent
                  punchlineId={id || ""}
                  isInPollPeriod={isInPollPeriod}
                  onPollSuccess={refreshPunchline}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <OtherInfo punchline={punchline} isPollEnded={isPollEnded} />

      <Development>
        <div>投稿: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>投票: {punchline?.contest?.postStartDate} - {punchline?.contest?.postEndDate}</div>
        <div>投票先アドレス: {punchline?.pollAddress}</div>
      </Development>
    </>
  );
}

export default PunchlinesDetail;
