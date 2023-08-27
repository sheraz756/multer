const express = require('express');
const authController = require('../controller/PostJobController');

const multer = require('multer')

const router = express.Router()
// const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" directory.
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the uploaded file.
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/CreatePost',upload.single('postImg'),authController.CreateJob)
router.post('/GetPosts',authController.GetJobs)
router.post('/DeletePost',authController.DeleteJob)
router.post('/EditPost',authController.EditJob)
// router.post('/login',authController.login)
// router.get('/getUser',authController.getUser)


module.exports = router;