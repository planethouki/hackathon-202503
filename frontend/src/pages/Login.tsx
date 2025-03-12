import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
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
  const [showAnonymousLoginModal, setShowAnonymousLoginModal] = useState(false);

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
    } catch (e: unknown) {
      console.error("ログインエラー:", e);
      setError(e instanceof Error ? e.message : "ログインに失敗しました。");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setShowAnonymousLoginModal(false);
    setIsLoggingIn(true);
    try {
      await signInAnonymously(auth);
      setError(null);
    } catch (e: unknown) {
      console.error("ログインエラー:", e);
      setError(e instanceof Error ? e.message : "ログインに失敗しました。");
    } finally {
      setIsLoggingIn(false);
    }
  }

  const handleCloseAnonymousLoginModal = () => setShowAnonymousLoginModal(false);

  return (
    <>
      <div className="mt-5 mb-5 py-3 bg-light">
        <Container>
          <h1 className="mb-5">ログイン</h1>
          {loading &&
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">読み込み中...</span>
              </Spinner>
            </div>
          }
          {!loading && (
            <>
              <div style={{ marginBottom: 300 }}>
                <Button
                  variant="primary"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                >
                  <span>Googleでログイン</span>
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  onClick={() => setShowAnonymousLoginModal(true)}
                  disabled={isLoggingIn}
                >
                  <span>匿名でログイン</span>
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
      <Modal show={showAnonymousLoginModal} onHide={handleCloseAnonymousLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>匿名ログインしますか？</Modal.Title>
        </Modal.Header>
        <Modal.Body>匿名ログインは、一度ログアウトすると、同じアカウントとしてログインすることができません。</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAnonymousLoginModal}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleAnonymousLogin}>
            匿名ログイン
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
