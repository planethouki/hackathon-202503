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
} from "react-bootstrap";

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
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

  return (
    <div className="mt-5 mb-5">
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
            <div>
              <Button
                variant="primary"
                onClick={handleLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    ログイン中...
                  </>
                ) : (
                  "Googleでログイン"
                )}
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
  );
};

export default Login;
