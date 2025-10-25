import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  console.log("Redis url not found");
}
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default redis;
