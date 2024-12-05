// config.js
const { Sequelize } = require('sequelize');

// เปลี่ยนข้อมูลเหล่านี้ให้ตรงกับการตั้งค่าของคุณ
const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
