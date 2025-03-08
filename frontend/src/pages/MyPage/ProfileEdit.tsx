import { useEffect } from "react";
import { Container, Form, Button, Spinner, Image } from "react-bootstrap";
import { useAuth } from "../../AuthProvider.tsx";
import { useUsersDetailApi, useProfileSetCall } from "../../hooks/usersApi.ts";
import { useState } from "react";
import { LoadingBlock } from "../../components/Loading.tsx";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {Avatar} from "../../components/Avatar.tsx";
import {Link} from "react-router";

function ProfileEdit() {
  const { loading, user: authUser } = useAuth();
  const { isLoading, user } = useUsersDetailApi(authUser?.uid);
  const { send, isLoading: isSending, error: sendError } = useProfileSetCall();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSentSuccess, setShowSentSuccess] = useState(false);
  const [showSentError, setShowSentError] = useState(false);

  useEffect(() => {
    if (!showSentSuccess) {return}
    const timeout = setTimeout(() => setShowSentSuccess(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSentSuccess, setShowSentSuccess]);

  useEffect(() => {
    if (!showSentError) {return}
    const timeout = setTimeout(() => setShowSentError(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSentError, setShowSentError]);

  useEffect(() => {
    if (!user) return;
    if (user.displayName) setDisplayName(user.displayName);
    if (user.bio) setBio(user.bio);
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewUrl(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!authUser) return;

    let avatarFileName = user.avatarFileName;

    if (avatarFile) {
      const storage = getStorage();
      avatarFileName = `${authUser?.uid}_${avatarFile.name}`;
      const avatarPath = `/public/avatar/${avatarFileName}`;
      const storageRef = ref(storage, avatarPath);
      await uploadBytes(storageRef, avatarFile);
    }

    const { success } = await send(displayName, bio, avatarFileName);

    if (success) {
      setShowSentSuccess(true);
    } else {
      setShowSentError(true);
    }
  };

  return (
    <>
      <Container>
        <div className="mt-5 mb-5">
          <Container>
            <h1>プロフィール編集</h1>
          </Container>
        </div>
      </Container>

      <div className="mb-5 py-5" style={{ backgroundColor: "#f5fff5" }}>
        <Container>
          {(isLoading || loading) && <LoadingBlock />}

          {!isLoading && !loading && (
            <Form style={{ maxWidth: "600px" }}>
              <Form.Group controlId="formDisplayName" className="mb-4">
                <Form.Label>ニックネーム</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ニックネームを入力"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBio" className="mb-4">
                <Form.Label>自己紹介</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="自己紹介を入力"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAvatarFile" className="mb-4">
                <Form.Label>アバター画像</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {!previewUrl && <div style={{ maxWidth: "200px", maxHeight: "200px" }}>
                  <Avatar fileName={user?.avatarFileName} />
                </div>}
                {previewUrl && (
                  <div className="mt-3">
                    <p>プレビュー:</p>
                    <Image
                      src={previewUrl}
                      alt="アバター プレビュー"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  </div>
                )}
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    保存中...
                  </>
                ) : (
                  "保存"
                )}
              </Button>
              <Link to="/mypage" className="d-inline-block ms-3">
                <Button
                  as="span"
                  variant="outline-secondary"
                  href="/mypage"
                >
                  戻る
                </Button>
              </Link>
              <div className="mb-5">
                {showSentSuccess &&
                  <span>保存しました</span>
                }
                {showSentError &&
                  <span>{sendError}</span>
                }
              </div>
            </Form>
          )}
        </Container>
      </div>
    </>
  );
}

export default ProfileEdit;
