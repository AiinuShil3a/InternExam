const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const CmsResetPasswordToken = sequelize.define('cms_reset_password_token', {
  reset_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cms_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cms_account', // อ้างอิงจากตาราง cms_account
      key: 'cms_account_id',
    },
  },
}, {
  timestamps: false, // ปิดการสร้าง createdAt และ updatedAt
  tableName: 'cms_reset_password_tokens', // ระบุชื่อตารางจริง
});

module.exports = CmsResetPasswordToken;
