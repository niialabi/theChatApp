import express from "express";
import * as AppController from "../controllers/AppController.js";
import * as UsersController from "../controllers/UsersController.js";
import * as AuthController from "../controllers/AuthController.js";
import * as RoomsController from "../controllers/RoomsController.js";
import * as MessagesController from "../controllers/MessagesController.js";

const router = express.Router();

router.get("/status", (req, res) => {
  AppController.getStatus(req, res);
});
router.post("/users", (req, res) => {
  UsersController.postNew(req, res);
});
router.get("/connect", (req, res) => {
  AuthController.getConnect(req, res);
});
router.get("/disconnect", (req, res) => {
  AuthController.getDisconnect(req, res);
});
router.get("/users/me", (req, res) => {
  UsersController.getMe(req, res);
});
router.get("/rooms", (req, res) => {
  RoomsController.getRooms(req, res);
});
router.post("/rooms", (req, res) => {
  RoomsController.createRoom(req, res);
});
router.post("/rooms/:id", (req, res) => {
  RoomsController.joinRoom(req, res);
});
router.get("/rooms/:roomId/messages", (req, res) => {
  MessagesController.getMessages(req, res);
});
router.get("/profile", (req, res) => {
  UsersController.getProfile(req, res);
});
router.post("/profile/bio", (req, res) => {
  UsersController.updateBio(req, res);
});

export default router;
