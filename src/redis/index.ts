import { RedisClientType, createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export let redisClient: RedisClientType;

(async () => {
  redisClient = createClient({
    password: process.env.REDIS_PW,
    socket: {
      host: "redis-13017.c82.us-east-1-2.ec2.cloud.redislabs.com",
      port: 13017,
    },
  });
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();
