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
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Card,
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
    <Container className="d-flex min-vh-100 align-items-center justify-content-center">
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h1 className="text-center mb-4">ログイン</h1>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">読み込み中...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <div className="text-center">
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
