import {useEffect, useMemo} from "react";
import {Container, Spinner, Row, Col, Button} from "react-bootstrap";
import {useParams, useNavigate, Link} from "react-router";
import {usePunchlinesDetailApi} from "../../hooks/punchlinesApi.ts";
import {LoadingBlock} from "../../components/Loading.tsx";
import {Development} from "../../components/Development.tsx";
import {PollComponent} from "../../components/PollComponent.tsx";
import { Punchline } from "../../libs/interfaces.ts";
import {useAuth} from "../../AuthProvider.tsx";

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

interface OtherInfoProps {
  punchline: Punchline;
  showWithdrawPoll: boolean;
  showWithdrawPunchline: boolean;
}

function OtherInfo({ punchline, showWithdrawPoll, showWithdrawPunchline }: OtherInfoProps) {

  const inInPostPeriod = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.postStartDate);
    const end = new Date(punchline.contest.postEndDate);
    const current = new Date();
    return start < current && current < end;
  }, [punchline]);

  const pollAddressHref = useMemo(() => {
    const t = import.meta.env.VITE_BLOCK_EXPLORER_TOKEN;
    return t.replace("{token}", import.meta.env.VITE_POLL_TOKEN);
  }, []);

  const pollTokenHref = useMemo(() => {
    const t = import.meta.env.VITE_BLOCK_EXPLORER_ADDRESS;
    return t.replace("{address}", punchline.pollAddress);
  }, [punchline]);

  const punchlineTokenHref = useMemo(() => {
    const t = import.meta.env.VITE_BLOCK_EXPLORER_TOKEN_ID;
    const punchlineTokenAddress = import.meta.env.VITE_PUNCHLINE_TOKEN;
    return t.replace("{token}", punchlineTokenAddress).replace("{tokenId}", punchline.tokenIdDec);
  }, [punchline]);

  return (
    <div className="mb-5 py-5" style={{ backgroundColor: "#fffacd" }}>
      <Container>
        <div className="mb-5">
          <h3>その他情報</h3>
        </div>
        <div className="mb-5">
          <h5 className="mb-3">投票トークン</h5>
          <div>
            <span>このアカウントに</span>
            <a
              href={pollAddressHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              投票トークン
              <i className="bi bi-box-arrow-up-right p-1" style={{ fontSize: "0.6rem" }}></i>
            </a>
            <span>が集まります</span>
          </div>
          <div className="mb-3">
            <a href={pollTokenHref} target="_blank" rel="noopener noreferrer">
              {punchline.pollAddress}
            </a>
          </div>

          <div>
            {showWithdrawPoll ? (
              <Link to={`/punchlines/${punchline.id}/withdraw/poll`}>
                <Button>投票トークンを引き出す</Button>
              </Link>
            ) : (
              <Button disabled>投票期間終了後、自分の投稿への投票トークンを引き出せます</Button>
            )}
          </div>
        </div>
        <div className="mb-5">
          <h5 className="mb-3">投稿NFT</h5>
          <div>
            投稿はNFTとしても表現されます。
          </div>
          <div className="mb-3">
            <a
              href={punchlineTokenHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              NFTアドレスはこちら
            </a>
          </div>
          {showWithdrawPunchline ? (
            <Link to={`/punchlines/${punchline.id}/withdraw/punchline`}>
              <Button variant="primary">NFTを引き出す</Button>
            </Link>
          ) : (
            <Button variant="primary" disabled>投稿者は自分の投稿NFTを引き出せます</Button>
          )}
        </div>
        <div className="mb-5">
          <h5 className="mb-3">投稿</h5>
          {inInPostPeriod ? (
            <Link to={`/punchline/post/${punchline.contestId}`}>
              <Button variant="primary">自分もこのお題に投稿する</Button>
            </Link>
          ) : (
            <Button variant="primary" disabled>このお題への投稿受付は終了しました</Button>
          )}
        </div>
      </Container>
    </div>
  );
}

function PunchlinesDetail() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const { user } = useAuth();

  const { isLoading, punchline, refresh: refreshPunchline } = usePunchlinesDetailApi(id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchlines/latest");
    }
  }, [id]);

  const showWithdrawPoll = useMemo(() => {
    if (!user) return false;
    if (!(punchline && punchline.contest)) return false;

    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    const isPollEnded = current > end;
    const isOwnPunchline = punchline.userId === user.uid;
    return isPollEnded && isOwnPunchline;
  }, [punchline, user]);

  const showWithdrawPunchline = useMemo(() => {
    if (!user) return false;
    if (!punchline) return false;

    return punchline.userId === user.uid;
  }, [punchline, user]);

  const isInPollPeriod = useMemo(() => {
    if (!(punchline && punchline.contest)) {
      return false;
    }

    const start = new Date(punchline.contest.pollStartDate);
    const end = new Date(punchline.contest.pollEndDate);
    const current = new Date();
    return start < current && current < end;
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

      <OtherInfo
        punchline={punchline}
        showWithdrawPoll={showWithdrawPoll}
        showWithdrawPunchline={showWithdrawPunchline}
      />

      <Development>
        <div>ID: {punchline?.id}</div>
        <div>投稿: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>投票: {punchline?.contest?.postStartDate} - {punchline?.contest?.postEndDate}</div>
        <div>投票先アドレス: {punchline?.pollAddress}</div>
      </Development>
    </>
  );
}

export default PunchlinesDetail;
