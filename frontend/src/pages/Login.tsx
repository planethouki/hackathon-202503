import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase.ts";
import {
	GoogleAuthProvider,
	signInWithPopup,
	browserPopupRedirectResolver,
} from "firebase/auth";
import { useAuth } from "../AuthProvider.tsx";

const Login: React.FC = () => {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!loading && user) {
			navigate("/");
		}
	}, [user, loading, navigate]);

	const handleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider, browserPopupRedirectResolver);
			setError(null);
		} catch (e: unknown) {
			console.error("ログインエラー:", e);
			setError(e instanceof Error ? e.message : "ログインに失敗しました。");
		}
	};

	return (
		<div>
			<h1>ログイン</h1>
			{loading ? (
				<p>読み込み中...</p>
			) : (
				<>
					<button onClick={handleLogin}>Googleでログイン</button>
					{error && <p style={{ color: "red" }}>{error}</p>}
				</>
			)}
		</div>
	);
};

export default Login;
