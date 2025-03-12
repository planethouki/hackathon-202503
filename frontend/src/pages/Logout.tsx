import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { auth } from "../firebase.ts";
import { signOut } from "firebase/auth";
import { useAuth } from "../AuthProvider.tsx";

const Logout: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setError(null);
        navigate("/login");
      } catch (e: unknown) {
        console.error("ログアウトエラー:", e);
        setError(e instanceof Error ? e.message : "ログアウトに失敗しました。");
      }
    };

    if (!loading && user) {
      handleLogout();
    } else if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <div className="mt-5 mb-5 py-3 bg-light" style={{ minHeight: 300 }}>
      <Container>
        <h1>ログアウト処理中...</h1>
        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>エラー: {error}</p>
        )}
      </Container>
    </div>
  );
};

export default Logout;
