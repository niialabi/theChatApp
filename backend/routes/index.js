import express from "express";
import * as AppController from "../controllers/AppController.js";
import * as UsersController from "../controllers/UsersController.js";
import * as AuthController from "../controllers/AuthController.js";
import * as RoomsController from "../controllers/RoomsController.js";
import * as MessagesController from "../controllers/MessagesController.js";

const router = express.Router();
// checks if redis and db are connected
router.get("/status", (req, res) => {
  AppController.getStatus(req, res);
});
// create a new user
// should include: displayName, email, password
// in the request's body
router.post("/users", (req, res) => {
  UsersController.postNew(req, res);
});
// logs the user in (get a token) and stores user id and token in redis
// should include 'Authorization' header using basic auth method
// email:password
router.get("/connect", (req, res) => {
  AuthController.getConnect(req, res);
});
// removes user id and token from redis
router.get("/disconnect", (req, res) => {
  AuthController.getDisconnect(req, res);
});
// gets user's email and id
router.get("/users/me", (req, res) => {
  UsersController.getMe(req, res);
});
// gets user's joined rooms
router.get("/rooms", (req, res) => {
  RoomsController.getRooms(req, res);
});
// creates a new room
router.post("/rooms", (req, res) => {
  RoomsController.createRoom(req, res);
});
// joins a room
// the room id to join should be in the url
router.post("/rooms/:id", (req, res) => {
  RoomsController.joinRoom(req, res);
});
// gets room information
router.get("/rooms/:id", (req, res) => {
  RoomsController.getRoom(req, res);
});
// creates a message in room.messages
router.get("/rooms/:roomId/messages", (req, res) => {
  MessagesController.getMessages(req, res);
});
// get's all of the user info
router.get("/profile", (req, res) => {
  UsersController.getProfile(req, res);
});
// updates user's bio
router.post("/profile/bio", (req, res) => {
  UsersController.updateBio(req, res);
});

export default router;
