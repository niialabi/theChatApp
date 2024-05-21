import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

export function getStatus(req, res) {
  try {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    res.status(200).send({ redis, db });
  } catch (error) {
    console.log(error);
  }
}