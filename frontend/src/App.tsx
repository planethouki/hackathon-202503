import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import { AuthProvider } from "./AuthProvider";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
