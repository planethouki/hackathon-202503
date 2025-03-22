import {useEffect, useMemo, useState} from "react";
import { Container, Spinner, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router";
import { usePunchlinesDetailApi } from "../../hooks/punchlinesApi.ts";
import { Development } from "../../components/Development.tsx";
import { useWithdrawPollTokens } from "../../hooks/withdrawApi.ts";
import { useAuth } from "../../AuthProvider.tsx";

function PunchlinesWithdraw() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { isLoading, punchline, error: punchlineError } = usePunchlinesDetailApi(id);
  const { withdraw, isLoading: isWithdrawing, error: withdrawError, success } = useWithdrawPollTokens();
  const [metamaskError, setMetamaskError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchlines/latest");
    }
  }, [id, navigate]);

  const isPollEnded = punchline?.contest ? new Date() > new Date(punchline.contest.pollEndDate) : false;
  const isOwnPunchline = punchline?.userId === user?.uid;

  const pollTokenHref = useMemo(() => {
    if (!punchline) return "";
    const t = import.meta.env.VITE_BLOCK_EXPLORER_ADDRESS;
    return t.replace("{address}", punchline.pollAddress);
  }, [punchline]);

  const handleWithdraw = async () => {
    if (!id || !punchline) return;

    try {
      if (typeof window.ethereum === 'undefined') {
        setMetamaskError('Metamaskがインストールされていません。Metamaskをインストールしてください。');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        setMetamaskError('Metamaskのアカウントにアクセスできませんでした。');
        return;
      }

      await withdraw(id, accounts[0], punchline.pollAddress);
    } catch (error) {
      console.error('Metamaskエラー:', error);
      setMetamaskError('Metamaskとの通信中にエラーが発生しました。');
    }
  };

  if (!id) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-5 mb-5">
        <Container>
          <Spinner />
        </Container>
      </div>
    );
  }

  if (!punchline) {
    return (
      <div className="mt-5 mb-5">
        <Container>
          <Alert variant="danger">
            投稿が見つかりませんでした。
            <Link to="/punchlines/latest" className="ms-2">投稿一覧に戻る</Link>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 mb-1 py-3 bg-light">
        <Container>
          <h1>
            <span className="me-3">
              投票トークンの引き出し
            </span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate(`/punchlines/${id}`)}
            >
              戻る
            </Button>
          </h1>
        </Container>
      </div>

      <div className="mb-1 py-5 bg-light">
        <Container>
          <div className="mb-4">
            <h2 className="mb-3">{punchline.title}</h2>
            <p>得票数: {punchline.pollCount}</p>
            <p>
              <a
                href={pollTokenHref}
                target="_blank"
                rel="noopener noreferrer"
              >引き出し元アドレス</a>
            </p>
          </div>

          {punchlineError && (
            <Alert variant="danger" className="mb-4">
              {punchlineError}
            </Alert>
          )}

          {!isOwnPunchline && (
            <Alert variant="warning" className="mb-4">
              自分の投稿のみトークンを引き出すことができます。
            </Alert>
          )}

          {!isPollEnded && (
            <Alert variant="info" className="mb-4">
              投票期間が終了した後でトークンを引き出すことができます。
            </Alert>
          )}

          {metamaskError && (
            <Alert variant="danger" className="mb-4">
              {metamaskError}
            </Alert>
          )}

          {withdrawError && (
            <Alert variant="danger" className="mb-4">
              エラー: {withdrawError}
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="mb-4">
              トークンの引き出しに成功しました！トランザクションがブロックチェーン上で確認されるまでお待ちください。
            </Alert>
          )}

          <Button
            variant="primary"
            onClick={handleWithdraw}
            disabled={!isOwnPunchline || !isPollEnded || isWithdrawing || success}
          >
            {isWithdrawing ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                処理中...
              </>
            ) : (
              '投票トークンを引き出す'
            )}
          </Button>
        </Container>
      </div>

      <div className="mb-5 py-5 bg-light">
        <Container>
          <div className="mb-4">
            <h5>トークン引き出しについて</h5>
            <p>
              投票期間が終了した後、あなたの投稿に集まった投票トークン（PollToken）を引き出すことができます。
              トークンはERC20規格に準拠しており、Metamaskを使用して引き出しトランザクションを送信します。
            </p>
            <p>
              引き出しにはMetamaskとガス代が必要です。
            </p>
            <p>
              既に引き出し済みかどうかのチェック機能が未実装のため、
              なんどでも引き出し要求ができてしまいます。
              事前に引き出せるトークンがあるかどうかをご確認頂ければ幸いです。
            </p>
          </div>
          <div>
            <h5>Soneiumについて</h5>
            <p>
              本アプリはSoneiumのテストネット、Minatoを使用しております。
              MetamaskにてMinatoのネットワークに設定した上でお使いください。
            </p>
            <p>
              <a
                href="https://docs.soneium.org/docs/users/wallets#metamask"
                target="_blank"
                rel="noopener noreferrer"
              >ネットワーク情報はこちら（Soneiumのドキュメントにジャンプします）</a>
            </p>
          </div>
        </Container>
      </div>

      <Development>
        <div>投稿ID: {id}</div>
        <div>投票先アドレス: {punchline?.pollAddress}</div>
        <div>投票期間: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>投票期間終了: {isPollEnded ? 'はい' : 'いいえ'}</div>
        <div>自分の投稿: {isOwnPunchline ? 'はい' : 'いいえ'}</div>
      </Development>
    </>
  );
}

export default PunchlinesWithdraw;
