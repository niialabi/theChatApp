import express from "express";
import * as AppController from "../controllers/AppController.js";
import * as UsersController from "../controllers/UsersController.js";
import * as AuthController from "../controllers/AuthController.js";

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

export default router;
