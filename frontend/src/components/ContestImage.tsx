import {useEffect, useState} from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Image, Spinner } from "react-bootstrap";

interface Props {
  fileName: string;
  alt: string;
}

export function ContestImage({ fileName, alt }: Props) {
  const [imageUrl, setImageUrl] = useState("");

  const storage = getStorage();

  const contestRef = ref(storage, `public/contests/${fileName}`);

  useEffect(() => {
    getDownloadURL(contestRef)
      .then((url) => setImageUrl(url))
      .catch((err) => {
        setImageUrl("/default-contest.svg")
        console.error(err)
      });
  }, [contestRef]);

  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          className="w-100"
        />
      ) : (
        <Spinner />
      )}
    </>
  );
}
