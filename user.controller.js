// controller/user.controller.js
const bcrypt = require('bcrypt');
const { User, Attendance } = require('../models/index');
const { Op } = require('sequelize');

exports.addUser = async (req, res) => {
  const { usn, pw, name, role } = req.body;
  if (!usn || !pw || !name || !role) {
    return res.status(400).json({ status: 'error', message: 'All fields required' });
  }

  try {
    const hashed = await bcrypt.hash(pw, 10);
    const user = await User.create({ usn, pw: hashed, name, role });
    res.status(201).json({
      status: 'success',
      message: 'User created',
      data: { id: user.id, usn, name, role }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.pw) updates.pw = await bcrypt.hash(updates.pw, 10);

  try {
    await User.update(updates, { where: { id } });
    res.json({ status: 'success', message: 'User updated' });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { attributes: { exclude: ['pw'] } });
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', data: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['pw'] } });
    res.json({ status: 'success', data: users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};