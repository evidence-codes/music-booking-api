"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/redisConnection.ts
const redis_1 = require("redis");
const config_1 = require("../config/config");
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: config_1.config.redis.host,
        port: Number(config_1.config.redis.port),
    },
    password: config_1.config.redis.password,
});
// Connect once and handle errors
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});
redisClient
    .connect()
    .then(() => console.log('Connected to Redis successfully'))
    .catch((error) => console.error('Error connecting to Redis:', error));
exports.default = redisClient;
