import sha1 from "sha1";
import redisClient from "../utils/redis.js";
import dbClient from "../utils/db.js";

import { v4 as uuidv4 } from "uuid";

export async function getConnect(req, res) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const buff = Buffer.from(authorization.split(" ")[1], "base64");
    const creds = buff.toString("utf-8");
    const [email, password] = creds.split(":");
    const user = await dbClient.findUser(email);
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    if (user.password !== sha1(password)) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const token = uuidv4();
    const key = `auth_${token}`;
    const value = user._id.toString();
    const duration = 60 * 60 * 24;
    await redisClient.set(key, value, duration);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function getDisconnect(req, res) {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    await redisClient.del(`auth_${token}`);
    return res.status(204).end();
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized" });
  }
}
