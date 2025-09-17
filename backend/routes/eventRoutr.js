const express = require("express");
const router = express.Router();
const event = require("../controllers/eventController");

router.get("/visitors",event.getEvent);
router.post("/visitors",event.addEvent);
router.delete("/visitors/:id",event.deleteEvent);
router.put("/visitors/:id",event.updateEvent);


module.exports = router;