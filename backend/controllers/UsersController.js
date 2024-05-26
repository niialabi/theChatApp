import sha1 from "sha1";
import dbClient from "../utils/db.js";
import redisClient from "../utils/redis.js";
import * as userUtils from "../utils/users.js";

export async function postNew(req, res) {
  const { displayName, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }
  if (!password) {
    return res.status(400).json({ error: "Missing password" });
  }
  if (!displayName) {
    return res.status(400).json({ error: "Missing displayName" });
  }

  const hashedPassword = sha1(password);

  try {
    const user = await dbClient.findUser(email);

    if (user) {
      res.status(400).json({ error: "Already exist" });
    } else {
      await dbClient.createUser(displayName, email, hashedPassword);
      const newUser = await dbClient.findUser(email);
      res.status(201).json({ id: newUser._id, email: newUser.email });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMe(req, res) {
  const token = req.header("X-Token");
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const user = await dbClient.findUserById(userId);
  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  return res.status(200).send({ id: user._id, email: user.email });
}

export async function getProfile(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function getUserProfile(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    const userId = req.params.id;
    if (!userId) return res.status(400).send({ error: "invalid request" });
    const wantedUser = await dbClient.findUserById(userId);
    if (!wantedUser) return res.status(400).send({ error: "user not found" });
    return res.status(200).send({ user: wantedUser });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function updateBio(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    const { bio } = req.body;
    if (!bio) return res.status(400).send({ error: "Missing bio" });
    const result = dbClient.updateBio(user._id, bio);
    if (!result) return res.status(400).send({ error: "invalid request" });
    return res.status(200).send({});
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}
