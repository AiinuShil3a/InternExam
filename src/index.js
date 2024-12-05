const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config');
const userSchema = require('./schema/userSchema');
const userResolver = require('./resolvers/userResolver');

const app = express();

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// สร้างฟังก์ชันเพื่อเริ่มต้นเซิร์ฟเวอร์
async function startApolloServer() {
  // สร้าง Apollo Server
  const server = new ApolloServer({
    typeDefs: userSchema,
    resolvers: userResolver,
  });

  // เรียก server.start() ก่อนเชื่อมกับ Express
  await server.start();

  // เชื่อมต่อ Apollo Server กับ Express
  server.applyMiddleware({ app });

  // กำหนดให้เซิร์ฟเวอร์ฟังที่พอร์ต 4000
  app.listen(4000, () => {
    console.log('Server running at http://localhost:4000/graphql');
  });
}

// เรียกฟังก์ชันเริ่มต้น
startApolloServer();
