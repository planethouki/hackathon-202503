import {useEffect, useMemo, useState} from "react";
import { Container, Spinner, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router";
import { usePunchlinesDetailApi } from "../../hooks/punchlinesApi.ts";
import { Development } from "../../components/Development.tsx";
import { useWithdrawPunchlineToken } from "../../hooks/withdrawApi.ts";
import { useAuth } from "../../AuthProvider.tsx";

function PunchlinesWithdraw() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { isLoading, punchline, error: punchlineError } = usePunchlinesDetailApi(id);
  const { withdraw, isLoading: isWithdrawing, error: withdrawError, success, hash } = useWithdrawPunchlineToken();
  const [metamaskError, setMetamaskError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined) {
      navigate("/punchlines/latest");
    }
  }, [id, navigate]);

  const isOwnPunchline = punchline?.userId === user?.uid;

  const txHref = useMemo(() => {
    if (!hash) return "";
    const t = import.meta.env.VITE_BLOCK_EXPLORER_TX;
    return t.replace("{tx}", hash);
  }, [hash]);

  const punchlineTokenHref = useMemo(() => {
    if (!punchline) return "";
    const t = import.meta.env.VITE_BLOCK_EXPLORER_TOKEN_ID;
    const punchlineTokenAddress = import.meta.env.VITE_PUNCHLINE_TOKEN;
    return t.replace("{token}", punchlineTokenAddress).replace("{tokenId}", punchline.tokenIdDec);
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

      await withdraw(id, accounts[0]);
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
              投稿NFTの引き出し
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
            <div className="mb-3">
              <a
                href={punchlineTokenHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {import.meta.env.VITE_PUNCHLINE_TOKEN}
              </a>
            </div>
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
              <span>NFTの引き出しに成功しました！</span>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={txHref}
              >
                トランザクション
              </a>
              <span>がブロックチェーン上で確認されるまでお待ちください。</span>
            </Alert>
          )}

          <Button
            variant="primary"
            onClick={handleWithdraw}
            disabled={!isOwnPunchline || isWithdrawing || success}
          >
            {isWithdrawing ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                処理中...
              </>
            ) : (
              '投稿NFTを引き出す'
            )}
          </Button>
        </Container>
      </div>

      <div className="mb-5 py-5 bg-light">
        <Container>
          <div className="mb-4">
            <h5>NFT引き出しについて</h5>
            <p>
              あなたの投稿NFTを引き出すことができます。
              トークンはERC721規格に準拠しており、ブロックエクスプローラーで確認することができます。
            </p>
            <p>
              引き出しトランザクションはサービス側で送信されますので、ガス代はかかりません。
              ただし、あなたのアドレスをMetamaskから取得するため、Metamaskの読み取り許可を求める場合があります。
            </p>
            <p>
              既に引き出し済みかどうかのチェック機能が未実装のため、
              何度でも引き出し要求ができてしまいます。
              既にあなたが所有者である場合はトランザクションが失敗しますのでご了承ください。
            </p>
          </div>
          <div>
            <h5>Soneiumについて</h5>
            <p>
              本アプリはSoneiumのテストネット、Minatoを使用しております。
              MetamaskにてMinatoのネットワークに設定した上でお使いください。
            </p>
            <p>
              ブロックエクスプローラーの下の方にある、「Add Soneium Minato」をクリックすると、
              簡単にMetamaskにMinatoネットワークが追加できます。
              <a
                href="https://soneium-minato.blockscout.com"
                target="_blank"
                rel="noopener noreferrer"
              >https://soneium-minato.blockscout.com</a>
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
        <div>トークンID: {punchline?.tokenId} {punchline?.tokenIdDec}</div>
        <div>投票期間: {punchline?.contest?.pollStartDate} - {punchline?.contest?.pollEndDate}</div>
        <div>自分の投稿: {isOwnPunchline ? 'はい' : 'いいえ'}</div>
      </Development>
    </>
  );
}

export default PunchlinesWithdraw;
