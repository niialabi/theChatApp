import dbClient from "../utils/db.js";
import * as userUtils from "../utils/users.js";

export async function getMessages(req, res) {
  try {
    const user = await userUtils.validateUser(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    const roomId = req.params.roomId;
    if (!roomId) return res.status(404).send({ error: "Not Found" });
    const messages = await dbClient.getMessages(roomId);
    if (!messages) return res.status(400).send({ error: "invalid request" });
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function createMessage(message) {
  try {
    if (!message) return false;
    const newMsg = await dbClient.createMessage(message);
    if (!newMsg) return false;
    return newMsg;
  } catch (error) {
    console.log(error);
  }
}
