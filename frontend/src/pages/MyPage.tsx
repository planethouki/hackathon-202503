import { Container } from "react-bootstrap";
import { useAuth } from "../AuthProvider.tsx";

function MyPage() {
	const { loading, user } = useAuth();

	return (
		<Container>
			<h1>MyPage</h1>
			{!loading && user && (
				<>
					<span>ようこそ</span>
					<span>{user.displayName}</span>
					<span>さん</span>
				</>
			)}
		</Container>
	);
}

export default MyPage;
