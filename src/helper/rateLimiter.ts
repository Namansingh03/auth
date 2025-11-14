import { redis } from "@/lib/redis";

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 10 * 60; 

type RateLimitResult = {
  allowed: boolean;
  attempts: number;
  ttl: number; 
};

const buildKey = (email: string) => `otp_attempts:${email}`;

export async function checkOtpRateLimit(email: string): Promise<RateLimitResult> {
  const key = buildKey(email);

  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  let ttl = await redis.ttl(key);
  if (ttl < 0) ttl = 0;

  if (attempts > MAX_ATTEMPTS) {
    return {
      allowed: false,
      attempts,
      ttl,
    };
  }

  return {
    allowed: true,
    attempts,
    ttl,
  };
}

export async function resetOtpRateLimit(email: string): Promise<void> {
  const key = buildKey(email);
  await redis.del(key);
}
