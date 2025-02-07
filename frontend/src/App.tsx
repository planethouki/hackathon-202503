import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout.tsx";
import MyPage from "./pages/MyPage.tsx";
import Layout from "./layouts/Layout.tsx";
import { AuthProvider } from "./AuthProvider";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="logout" element={<Logout />} />
						<Route path="mypage" element={<MyPage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
