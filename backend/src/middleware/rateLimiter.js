import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return next();
    }

    const { success } = await ratelimit.limit(req.ip);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, try again later" });
    }

    next();
  } catch (error) {
    console.warn("Rate limiter unavailable, skipping:", error.message);
    next();
  }
};

export default rateLimiter;