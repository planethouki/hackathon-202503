import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

export const onPollWritten = onDocumentWritten(
  "punchlines/{punchlineId}/polls/{pollId}", async (event) => {
    const {count} = await db
      .collection(`punchlines/${event.params.punchlineId}/polls`)
      .count()
      .get()
      .then((q) => q.data());

    const pRef = db.doc(`punchlines/${event.params.punchlineId}`);
    const pSnap = await pRef.get();
    if (pSnap.exists) {
      await pRef.set({pollCount: count}, {merge: true});
    }
  }
);
