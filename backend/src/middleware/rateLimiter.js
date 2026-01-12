import ratelimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return next();
    }
    const { success } = await ratelimit.limit("my-ratelimit");
    if (!success)
      return res
        .status(429)
        .json({ message: "Too many requests, Try again later" });

    next();
  } catch (error) {
    console.warn("Rate Limiter Skipped (Redid Error):", error);
    next(error);
  }
};

export default rateLimiter;
