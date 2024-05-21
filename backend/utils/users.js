import redisClient from "./redis.js";
import dbClient from "./db.js";

export async function validateUser(req) {
  const obj = { userId: null, key: null };
  const token = req.header("X-Token");
  if (token) {
    obj.key = `auth_${token}`;
    obj.userId = await redisClient.get(obj.key);
  }
  const user = await dbClient.findUserById(obj.userId);
  if (user) return user;

  return false;
}
