import "reflect-metadata";
import sequelize from "./config/database";

import http from "http";

import app from "./app";

// import redisConnect from './helper/redisConnect';
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
// Connect to the database and sync models
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Supabase PostgreSQL");

    await sequelize.sync({ alter: true }); // Sync models

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

startServer();
