import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header.tsx";

const Layout: React.FC = () => {
	return (
		<div>
			<Header />

			<main>
				<Outlet />
			</main>

			<footer>
				<p>共通のフッター</p>
			</footer>
		</div>
	);
};

export default Layout;
