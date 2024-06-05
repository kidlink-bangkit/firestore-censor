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
functions.region("asia-southeast2");

exports.censor = functions.firestore
    .document("chatRooms/{roomId}/messages/{msgId}")
    .onCreate((snap, context) => {
      const message = snap.data();
      let censor = "SAFE";
      if (message.messageText.includes("anjing")) {
        censor = "UNSAFE";
      }
      return snap.ref.update({censor: censor});
    });
