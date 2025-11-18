import ratelimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-ratelimit");
    if (!success)
      return res
        .status(429)
        .json({ message: "Too many requests, Try again later" });

    next();
  } catch (error) {
    console.log("Rate Limiter Error:", error);
    next(error);  
  }
};

export default rateLimiter;
