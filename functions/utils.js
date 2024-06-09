const predictionMap = new Map();
predictionMap.set("goodword", "SAFE");
predictionMap.set("badword", "UNSAFE");
predictionMap.set("error", "UNSET");

exports.convertPredictionClass = (predictionClass) => {
  return predictionMap.get(predictionClass);
};
