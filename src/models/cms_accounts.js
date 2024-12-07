const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const CmsAccount = sequelize.define('cms_account', {
  cms_account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cms_firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cms_lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cms_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  cms_role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cms_mobile_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cms_mobile_country_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: { // แก้ไขให้ตรงกับฐานข้อมูล
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: { // แก้ไขให้ตรงกับฐานข้อมูล
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'cms_accounts', // ชื่อฐานข้อมูลให้ตรง
  timestamps: false, // ตั้งค่าให้ไม่ใช้ timestamps แบบอัตโนมัติ
});

module.exports = CmsAccount;
