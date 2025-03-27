import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { useAuth } from "../AuthProvider";
import {
  Container,
  Button,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [showGoogleLoginModal, setShowGoogleLoginModal] = useState(false); // Google Modalの状態

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      setError(null);
      setShowGoogleLoginModal(false);
    } catch (e: unknown) {
      console.error("ログインエラー:", e);
      setError(e instanceof Error ? e.message : "ログインに失敗しました。");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCloseGoogleLoginModal = () =>
    setShowGoogleLoginModal(false); // Google Modalを閉じる

  return (
    <>
      <div className="mt-5 mb-5 py-3 bg-light">
        <Container>
          <h1 className="mb-5">ログイン</h1>
          {loading && (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">読み込み中...</span>
              </Spinner>
            </div>
          )}
          {!loading && (
            <>
              <div style={{ marginBottom: 300 }}>
                <Button
                  variant="primary"
                  onClick={() => setShowGoogleLoginModal(true)}
                  disabled={isLoggingIn}
                >
                  <span>Googleでログイン</span>
                </Button>
              </div>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </>
          )}
        </Container>
      </div>

      <Modal show={showGoogleLoginModal} onHide={handleCloseGoogleLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Googleログイン</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Googleアカウントを使用してログインを行いますか？</p>
          <p>
            <a
              href="/terms"
              target="_blank"
            >
              利用規約
            </a>
          </p>
          {isLoggingIn && (
            <Spinner animation="border" role="status" className="d-block mx-auto">
              <span className="visually-hidden">ログイン中...</span>
            </Spinner>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseGoogleLoginModal}
            disabled={isLoggingIn}
          >
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
          >
            利用規約に同意してGoogleでログイン
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
