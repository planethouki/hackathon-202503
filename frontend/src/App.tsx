import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
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
          </Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
