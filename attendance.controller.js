// controller/attendance.controller.js
const { Attendance, User } = require('../models/index');

exports.recordAttendance = async (req, res) => {
  const { user_id, date, time, status } = req.body;
  if (!user_id || !date || !time || !status) {
    return res.status(400).json({ status: 'error', message: 'All fields required' });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const record = await Attendance.create({ userId: user_id, date, time, status });
    res.status(201).json({ status: 'success', data: record });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.getMonthlySummary = async (req, res) => {
  const { id } = req.params;
  const { month } = req.query; // YYYYMM

  if (!month || !/^\d{6}$/.test(month)) {
    return res.status(400).json({ status: 'error', message: 'month format: YYYYMM' });
  }

  try {
    const records = await Attendance.findAll({
      where: {
        userId: id,
        date: { [require('sequelize').Op.like]: `${month}%` }
      }
    });

    const summary = {
      present: 0, absent: 0, sick: 0, late: 0
    };
    records.forEach(r => summary[r.status]++);

    res.json({ status: 'success', data: { month, total: records.length, ...summary } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};