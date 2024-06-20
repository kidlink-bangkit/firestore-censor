const CENSOR_URL = "http://34.101.76.210:8000/predict";
const utils = require("./utils");
const {getFirestore} = require("firebase-admin/firestore");

exports.censor = async (text) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"text": text}),
  };
  try {
    const response = await fetch(CENSOR_URL, options);
    const data = await response.json();
    return utils.convertPredictionClass(data.class_label);
  } catch (err) {
    console.error(err);
    return "UNSET";
  }
};

exports.updateChatLastMessage = async (message, roomId) => {
  const db = getFirestore();
  if (message.censor == "SAFE") {
    await db.collection("chatRooms").doc(roomId).update({
      lastMessageTimestamp: message.timestamp,
      lastMessage: message.messageText,
    });
  }
};
