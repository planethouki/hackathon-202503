import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

export const onPunchlineWritten = onDocumentWritten(
  "punchlines/{docId}", async (event) => {
    const {count} = await db
      .collection("punchlines")
      .count()
      .get()
      .then((q) => q.data());

    await db
      .collection("parameters")
      .doc("punchlines")
      .set({count}, {merge: true});
  }
);
