import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

export const onContestWritten = onDocumentWritten(
  "contests/{docId}", async (event) => {
    const {count} = await db
      .collection("contests")
      .count()
      .get()
      .then((q) => q.data());

    await db
      .collection("parameters")
      .doc("contests")
      .set({count}, {merge: true});
  }
);
