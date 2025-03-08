import {useEffect, useState} from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Image, Spinner } from "react-bootstrap";

export function Avatar({ fileName = "1F923.svg" }: { fileName?: string }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const storage = getStorage();

  const avatarRef = ref(storage, `public/avatar/${fileName}`);

  useEffect(() => {
    getDownloadURL(avatarRef)
      .then((url) => setAvatarUrl(url))
      .catch((err) => {
        setAvatarUrl("/default-avatar.png")
        console.error(err)
      });
  }, [avatarRef]);

  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="avatar"
          className="w-100"
        />
      ) : (
        <Spinner />
      )}
    </>
  );
}
