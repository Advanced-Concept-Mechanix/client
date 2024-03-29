import RNImageToPdf from "react-native-image-to-pdf";

export default base64Arr => {
    // It is a promise based function
    // Create an array containing the path of each base64 images
    // let base64Paths = [];
    // base64Paths.length = 0; // re-initialize the array for further re-use
  
    // base64Arr.forEach(base64 => {
    //   base64Paths.push(`data:image/jpeg;base64,${base64}`);
    // });
  
    // Convert base64 images to pdf from the paths array
    return RNImageToPdf.createPDFbyImages({
      imagePaths: base64Arr,
      name: "PDF_Name",
      maxSize: { // optional maximum image dimension - larger images will be resized
        width: 900,
        height: Math.round(deviceHeight() / deviceWidth() * 900),
      },
      quality: .7,
    });
};


//sample usage
// import toPDF from "./pdfConverter.js";

// toPDF(myBase64array)
// .then(pdf => {
//   console.log("pdf ", pdf);
// });