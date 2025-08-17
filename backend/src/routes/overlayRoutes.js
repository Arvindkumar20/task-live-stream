import express from "express";
import * as overlayController from "../controllers/overlayController.js";

const router = express.Router();

router.post("/", overlayController.create);
router.get("/", overlayController.getAll);
router.get("/:id", overlayController.getOne);
router.put("/:id", overlayController.update);
router.delete("/:id", overlayController.remove);

export default router;
