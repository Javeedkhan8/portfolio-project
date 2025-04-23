const {cloudinary} = require("../config/cloudinary");
const fs = require("fs");


const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "ecommerce",
    });

    fs.unlinkSync(filePath); 
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed");
  }
};

module.exports =  {uploadToCloudinary};
