import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

export const onPollWritten = onDocumentWritten(
  "punchlines/{punchlineId}/polls/{pollId}", async (event) => {
    const count = await db
      .collection(`punchlines/${event.params.punchlineId}/polls`)
      .get()
      .then((q) => q.size);

    await db
      .doc(`punchlines/${event.params.punchlineId}`)
      .set({pollCount: count}, {merge: true});
  }
);
