const express = require("express");
const router = express.Router();
const profileDetail = require("../controllers/profileController");

router.get("/profiledetails",profileDetail.getProfileDetail);
router.post("/profiledetails",profileDetail.addProfileDetail);
router.put("/profiledetails/:id",profileDetail.updateProfileDetails);
router.delete("/profiledetails/:id",profileDetail.deleteProfileDetail);

module.exports = router;