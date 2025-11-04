// route/attendance.routes.js
const express = require("express");
const router = express.Router();
const attendanceCtrl = require("../controller/attendance.controller");

router.post("/", attendanceCtrl.recordAttendance);
router.get("/summary/:id", attendanceCtrl.getMonthlySummary);

module.exports = router;