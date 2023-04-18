import Tesseract from "tesseract.js";
import * as ml5 from "ml5";

export const OCR = async (image) => {
  await Tesseract.recognize(image, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    console.log(text.includes("HAFIZH") && text.includes("MUHAMMAD"));
  });
};

// export const classifyImg = (image) => {
//   // Initialize the Image Classifier method with MobileNet
//   const classifier = ml5.imageClassifier(
//     "./ImageClassification.json",
//     modelLoaded
//   );
//   // When the model is loaded
//   function modelLoaded() {
//     console.log("Model Loaded!");
//   }
//   // Put the image to classify inside a variable
//   // Make a prediction with a selected image
//   classifier.predict(image, 5, function (err, results) {
//     // print the result in the console
//     console.log(results);
//   });
// };
