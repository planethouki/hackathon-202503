import React from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from "firebase/auth";

const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider, browserPopupRedirectResolver);
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };

	return (
		<div>
			<h1>ログイン</h1>
			<button onClick={handleLogin}>Googleでログイン</button>
		</div>
	);
};

export default Login;
