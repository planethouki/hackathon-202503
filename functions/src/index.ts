/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import {initializeApp} from "firebase-admin/app";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({
  region: "asia-northeast1",
});

initializeApp();

export * from "./api";
export * from "./auth";
export * from "./call";
export * from "./firestore";

// export * from "./trial";
