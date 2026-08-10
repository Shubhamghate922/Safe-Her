/**
 * TOPIC DEMO: CLOSURES IN NODE.JS & EXPRESS.JS
 * 
 * A Closure is a function that retains access to variables from its outer lexical scope
 * even after the outer function has finished executing.
 * 
 * Here we demonstrate closures via higher-order middleware factory functions:
 */

// 1. Closure-based Rate Limiter Factory
export const createClosureRateLimiter = (maxRequests = 60, windowMs = 60000) => {
  // Retained outer lexical state across HTTP requests
  const requestCounts = new Map();

  return (req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const now = Date.now();

    if (!requestCounts.has(clientIp)) {
      requestCounts.set(clientIp, { count: 1, resetTime: now + windowMs });
    } else {
      const record = requestCounts.get(clientIp);
      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
      } else {
        record.count += 1;
        if (record.count > maxRequests) {
          return res.status(429).json({
            success: false,
            message: 'Too many requests. Closure Rate Limiter active!',
            retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
          });
        }
      }
    }

    // Attach closure stats to response header
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - requestCounts.get(clientIp).count);
    next();
  };
};

// 2. Closure-based Request Execution Timer
export const createClosureExecutionTimer = (prefix = 'EXPRESS') => {
  return (req, res, next) => {
    const startTime = process.hrtime(); // Enclosed state

    res.on('finish', () => {
      const elapsed = process.hrtime(startTime);
      const elapsedMs = (elapsed[0] * 1000 + elapsed[1] / 1e6).toFixed(2);
      console.log(`⏱️  [${prefix}] ${req.method} ${req.originalUrl} - Completed in ${elapsedMs} ms`);
    });

    next();
  };
};
