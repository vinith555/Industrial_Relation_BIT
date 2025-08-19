const express = require("express");
const router = express.Router();
const profileDetail = require("../controllers/profileController");
const upload = require("../middlewares/multer");


router.get("/profiledetails",profileDetail.getProfileDetail);
router.post("/profiledetails", upload.single('image'), profileDetail.addProfileDetail);
router.put("/profiledetails/:id", upload.single('image'), profileDetail.updateProfileDetails);
router.delete("/profiledetails/:id",profileDetail.deleteProfileDetail);

module.exports = router;