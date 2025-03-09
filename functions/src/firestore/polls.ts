import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {logger} from "firebase-functions";
import updateRanking from "./lib/updateRanking";
import transfer from "./lib/erc20Transfer";
import {defineSecret} from "firebase-functions/params";

const db = getFirestore();
const recipient = defineSecret("ETH_TEST_RECEIVE_ADDRESS");

export const onPollWritten = onDocumentWritten(
  "punchlines/{punchlineId}/polls/{pollId}", async (event) => {
    // 投票数更新
    const punchlineId = event.params.punchlineId;

    const {count} = await db
      .collection(`punchlines/${punchlineId}/polls`)
      .count()
      .get()
      .then((q) => q.data());

    const pRef = db.doc(`punchlines/${punchlineId}`);
    const pSnap = await pRef.get();
    const punchline = pSnap.data();

    if (!pSnap.exists || !punchline) {
      logger.error("Unable to find punchlines from database");
      return;
    }

    await pRef.set({pollCount: count}, {merge: true});

    // ランキング更新
    await updateRanking(punchline.contestId);

    // 投票作成ならETHに書き込む
    const existsAfter = event.data?.after !== undefined;
    const existsBefore = event.data?.before !== undefined;
    if (!existsBefore && existsAfter) {
      logger.info("New poll created; updating ETH transfer for recipient.");
      await transfer(recipient.value());
    }
  }
);
