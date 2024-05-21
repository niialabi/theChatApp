import dbClient from "../utils/db.js";
import * as userUtils from "../utils/users.js";

export async function getRooms(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    if (!user.rooms) return res.status(200).send({ rooms: [] });
    const rooms = await dbClient.getUserRooms(user.rooms);
    return res.status(200).send({ rooms });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function createRoom(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    const { name } = req.body;
    if (!name) return res.status(400).send({ error: "Missing name" });
    const room = await dbClient.createRoom(user._id, name);
    if (!room) return res.status(500).send({ error: "internal server error" });
    return res.status(201).send({ room });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function joinRoom(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    const roomId = req.params.id;
    if (!roomId) return res.status(404).send({ error: "Not Found" });
    const result = await dbClient.joinRoom(user._id, roomId);
    if (!result) return res.status(400).send({ error: "failed to join" });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}
