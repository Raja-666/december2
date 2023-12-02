const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const KYCModel = require('../models/KycSchema');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploadkyc';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[-T:.Z]/g, '');
    cb(null, formattedDate + '-' + file.originalname);
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Middleware to handle file uploads
router.use(upload.fields([
  { name: 'frontSideProof', maxCount: 1 },
  { name: 'backSideProof', maxCount: 1 },
  { name: 'selfieProof', maxCount: 1 },
]));
 
const handleKyccontrol = async(req,res) =>{
    try {
    // Check if files are present
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    // Destructure fields from the request body
    const {
      proofType,
      message,
    } = req.body;

    // Extract file paths from Multer's file objects
    const frontSideProofPath = req.files['frontSideProof'][0].path;
    const backSideProofPath = req.files['backSideProof'][0].path;
    const selfieProofPath = req.files['selfieProof'][0].path;

    // Create a new instance of KYCModel with the extracted data
    const kycData = new KYCModel({
      proofType,
      frontSideProof: frontSideProofPath,
      backSideProof: backSideProofPath,
      selfieProof: selfieProofPath,
      message,
    });

    // Save the KYC data to the database
    await kycData.save();

    // Add the preview URLs to the response
    const previewUrls = {
      frontSideProofPreview: `/preview/${frontSideProofPath}`,
      backSideProofPreview: `/preview/${backSideProofPath}`,
      selfieProofPreview: `/preview/${selfieProofPath}`,
    };

    // Send a success response
    res.status(200).json({ success: true, message: 'KYC data submitted successfully', previewUrls });
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

}
module.exports = {handleKyccontrol};