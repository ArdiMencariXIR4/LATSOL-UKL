// controller/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const JWT_SECRET = 'your-super-secret-jwt-key-12345';

exports.authenticate = async (req, res) => {
  const { usn, pw } = req.body;

  if (!usn || !pw) {
    return res.status(400).json({
      status: 'error',
      message: 'usn and pw are required'
    });
  }

  try {
    const user = await User.findOne({ where: { usn } });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const match = await bcrypt.compare(pw, user.pw);
    if (!match) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user.id, usn: user.usn, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      message: 'Login successful',
      token
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};