const express = require('express');
const bodyParser = require('body-parser');
const cmsUserRoutes = require('./routes/cmsUserRoutes');
const sequelize = require('./config');

const app = express();

// ใช้ bodyParser เพื่อแปลงข้อมูลใน request body
app.use(bodyParser.json());

// ใช้ route สำหรับการสร้างผู้ใช้ใหม่
app.use('/api', cmsUserRoutes);

// เชื่อมต่อกับฐานข้อมูล
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
