import Redis from "ioredis";
import logger from "./logger.js";

const redisClient = new Redis(process.env.VALKEY_URL || process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redisClient.on("connect", () => {
  logger.info("Valkey Matrix Link Establish: Connected");
});

redisClient.on("error", (err) => {
  logger.info("Valkey Matrix Link Failed: " + err.message);
});

export default redisClient;
