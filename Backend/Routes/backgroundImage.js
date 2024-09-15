import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const routes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = "uploads/";

    // Ensure the folder exists; if not, create it
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    // Delete all files in the folder before saving the new one
    fs.readdir(uploadFolder, (err, files) => {
      if (err) {
        console.error("Error reading uploads folder:", err);
      } else {
        files.forEach((file) => {
          fs.unlink(path.join(uploadFolder, file), (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        });
      }
      // Proceed to save the new file in the cleared folder
      cb(null, uploadFolder);
    });
  },
  filename: (req, file, cb) => {
    // Save the file with its original name or customize it as needed
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

import { imageUpload, fetchImage } from "../Controllres/backgroundImage.js";
routes.post("/", upload.single("image"), imageUpload);
routes.get("/fetchImage", fetchImage);

export default routes;
