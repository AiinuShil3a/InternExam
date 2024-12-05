'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // สร้าง Unique Index สำหรับฟิลด์ email
    await queryInterface.addIndex('users', ['email'], {
      unique: true, // กำหนดให้ Index เป็นแบบ Unique
      name: 'unique_email_index', // ตั้งชื่อ Index
    });

    // สร้าง Composite Index สำหรับ first_name และ last_name
    await queryInterface.addIndex('users', ['first_name', 'last_name'], {
      name: 'composite_name_index', // ตั้งชื่อ Index
    });
  },

  async down(queryInterface, Sequelize) {
    // ลบ Unique Index
    await queryInterface.removeIndex('users', 'unique_email_index');

    // ลบ Composite Index
    await queryInterface.removeIndex('users', 'composite_name_index');
  },
};
