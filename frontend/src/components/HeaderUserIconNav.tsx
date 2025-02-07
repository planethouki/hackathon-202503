import React from "react";
import { Nav, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router";

const HeaderUserIconNav: React.FC = () => {
	return (
		<Nav>
			<NavDropdown
				title={
					<Image
						src="/vite.svg"
						roundedCircle
						alt="ユーザーアイコン"
						width="30"
						height="30"
					/>
				}
				id="user-dropdown"
				align="end"
			>
				<NavDropdown.Item as={Link} to="/profile">
					プロフィール
				</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/settings">
					設定
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item as={Link} to="/logout">
					ログアウト
				</NavDropdown.Item>
			</NavDropdown>
		</Nav>
	);
};

export default HeaderUserIconNav;
