/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");


initializeApp();
const db = getFirestore();

exports.censor = functions
    .region("asia-southeast2")
    .firestore
    .document("chatRooms/{roomId}/messages/{msgId}")
    .onCreate(async (snap, context) => {
      const message = snap.data();
      let censor = "SAFE";
      if (message.messageText.includes("anjing")) {
        censor = "UNSAFE";
      }
      const timestamp = Date.now();
      if (censor == "SAFE") {
        await db.collection("chatRooms")
            .doc(context.params.roomId)
            .update({
              lastMessageTimestamp: timestamp,
              lastMessage: message.messageText,
            });
      }

      return snap.ref.update({censor: censor, serverTimestamp: timestamp});
    });
