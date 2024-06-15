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
const services = require("./services");

initializeApp();

exports.censor = functions
    .region("asia-southeast2")
    .firestore.document("chatRooms/{roomId}/messages/{msgId}")
    .onCreate(async (snap, context) => {
      const message = snap.data();
      const censor = await services.censor(message.messageText);
      const timestamp = Date.now();
      message.censor=censor;
      message.timestamp = timestamp;
      await services.updateChatLastMessage(message, context.params.roomId);
      return snap.ref.update({censor: censor, serverTimestamp: timestamp});
    });
