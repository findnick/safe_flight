// Controller function: databaseWrite
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUpload = async (req, res) => {
  try {
    // Accessing image details from req.file
    const imageDetails = req.file;

    // Logging image details
    console.log("Image Details:", imageDetails);

    // Access specific details
    const { originalname, filename, mimetype, size, path } = imageDetails;

    res
      .status(200)
      .json({ message: "Image uploaded successfully", imageDetails });
  } catch (error) {
    console.error("Error processing image upload:", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
};

const fetchImage = async (req, res) => {
  const reportFolderPath = path.join(__dirname, "..", "uploads");

  // Read the files in the uploads folder
  fs.readdir(reportFolderPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading uploads folder", error: err });
    }

    // Check if there's at least one file
    if (files.length === 0) {
      return res
        .status(404)
        .json({ message: "No image found in uploads folder" });
    }

    // Assuming there's always one file, get the first file in the folder
    const filePath = path.join(reportFolderPath, files[0]);

    // Send the image file as a response
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "Error sending image", error: err });
      }
    });
  });
};

export { imageUpload, fetchImage };
