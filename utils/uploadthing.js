const { generateUploadButton, generateUploadDropzone } = require("@uploadthing/react");
const { ourFileRouter } = require("../app/api/uploadthing/core");

const UploadButton = generateUploadButton(ourFileRouter);
const UploadDropzone = generateUploadDropzone(ourFileRouter);

module.exports = { UploadButton, UploadDropzone };
