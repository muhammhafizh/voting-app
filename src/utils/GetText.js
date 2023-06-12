import Tesseract from "tesseract.js";

export const OCR = async (image, username, nim, programStudi) => {
  let value;

  await Tesseract.recognize(image, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    const convText = text.toLowerCase();
    const name = convText.includes(username);
    const program = convText.includes(programStudi);
    const nimMahasiswa = convText.includes(nim);

    value = { name, nimMahasiswa, program };
  });

  return value;
};
