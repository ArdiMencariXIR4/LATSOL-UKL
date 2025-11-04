// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:./attendance.db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  pw: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: DataTypes.STRING,
  role: DataTypes.ENUM('student', 'teacher')
});

const Attendance = sequelize.define('Attendance', {
  date: DataTypes.STRING, // YYYYMMDD
  time: DataTypes.STRING, // HHMMSS
  status: DataTypes.ENUM('present', 'absent', 'sick', 'late')
});

User.hasMany(Attendance);
Attendance.belongsTo(User);

sequelize.sync({ force: false });

module.exports = { sequelize, User, Attendance };