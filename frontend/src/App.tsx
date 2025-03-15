import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout.tsx";
import MyPage from "./pages/MyPage/MyPage.tsx";
import ProfileEdit from "./pages/MyPage/ProfileEdit.tsx";
import MyPolls from "./pages/MyPage/Polls.tsx";
import MyPunchlines from "./pages/MyPage/Punchlines.tsx";
import NetaNew from "./pages/Neta/New.tsx";
import NetaNewDetail from "./pages/Neta/New/Detail.tsx";
import NetaNewDetailConfirm from "./pages/Neta/New/DetailConfirm.tsx";
import NetaNewDetailComplete from "./pages/Neta/New/DetailComplete.tsx";
import PunchlinePost from "./pages/Punchline/Post.tsx";
import PunchlinePostDetail from "./pages/Punchline/Post/Detail.tsx";
import PunchlinePostConfirm from "./pages/Punchline/Post/Confirm.tsx";
import PunchlinePostComplete from "./pages/Punchline/Post/Complete.tsx";
import ContestsDetail from "./pages/Contests/Detail.tsx";
import PunchlinesDetail from "./pages/Punchlines/Detail.tsx";
import PunchlinesLatest from "./pages/Punchlines/Latest.tsx";
import UsersDetail from "./pages/Users/Detail.tsx";
import Layout from "./layouts/Layout.tsx";
import { TitleYouTubeProvider } from "./contexts/TitleYouTubeContext";
import {AuthProvider, ProtectedRoute} from "./AuthProvider";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="mypage" element={<ProtectedRoute />}>
              <Route index element={<MyPage />} />
              <Route path="profile/edit" element={<ProfileEdit />} />
              <Route path="polls" element={<MyPolls />} />
              <Route path="punchlines" element={<MyPunchlines />} />
            </Route>
            <Route path="neta">
              <Route path="new">
                <Route index element={<NetaNew />} />
                <Route path="detail" element={<NetaNewDetail />} />
                <Route
                  path="detail/confirm"
                  element={<NetaNewDetailConfirm />}
                />
                <Route
                  path="detail/complete"
                  element={<NetaNewDetailComplete />}
                />
              </Route>
            </Route>
            <Route path="punchline" element={<TitleYouTubeProvider><Outlet /></TitleYouTubeProvider>}>
              <Route path="post">
                <Route index element={<PunchlinePost />} />
                <Route path=":id" element={<PunchlinePostDetail/>}/>
                <Route path=":id/confirm" element={<PunchlinePostConfirm/>}/>
                <Route path=":id/complete" element={<PunchlinePostComplete/>}/>
              </Route>
            </Route>
            <Route path="punchlines">
              <Route path=":id" element={<PunchlinesDetail />} />
              <Route path="latest" element={<PunchlinesLatest />} />
            </Route>
            <Route path="contests">
              <Route path=":id" element={<ContestsDetail />} />
            </Route>
            <Route path="users">
              <Route path=":id/profile" element={<UsersDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
