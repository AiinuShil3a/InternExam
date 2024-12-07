const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('users', {
  first_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  last_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  indexes: [
      {
          name: 'unique_email_index', // ตั้งชื่อ index เอง
          unique: true,
          fields: ['email'],
      },
      {
          name: 'first_last_name_index', // ตั้งชื่อ index เอง
          fields: ['first_name', 'last_name'],
      },
  ],
});

// sequelize.sync({ alter: false }) // `alter: true` จะทำการแก้ไขตารางที่มีอยู่แล้ว
//   .then(() => {
//     console.log("Database synced and indexes created!");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

module.exports = User;
