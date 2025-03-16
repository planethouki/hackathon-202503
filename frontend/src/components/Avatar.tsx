import {useEffect, useState} from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Image, Spinner } from "react-bootstrap";

export function Avatar({ fileName = "1F923.svg" }: { fileName?: string }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const storage = getStorage();

  useEffect(() => {
    const avatarRef = ref(storage, `public/avatar/${fileName}`);
    getDownloadURL(avatarRef)
      .then((url) => setAvatarUrl(url))
      .catch((err) => {
        setAvatarUrl("/default-avatar.png")
        console.error(err)
      });
  }, [fileName]);

  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="avatar"
          className="w-100"
        />
      ) : (
        <span
          className="w-100 d-flex justify-content-center align-items-center"
          style={{
            aspectRatio: 1,
          }}
        >
          <Spinner animation="grow" />
        </span>
      )}
    </>
  );
}
