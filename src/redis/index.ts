import { RedisClientType, createClient } from "redis";

export let redisClient: RedisClientType;

(async () => {
  redisClient = createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();
