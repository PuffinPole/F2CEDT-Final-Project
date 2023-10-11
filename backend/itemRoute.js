import express from "express";
import * as itemController from "./itemController.js";
const router = express.Router();

router.get("/", itemController.getItems);
router.post("/", itemController.createItem);

export default router;