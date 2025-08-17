import express from "express";
import { createOverlay, deleteOverlay, getOverlayById, getOverlays, updateOverlay } from "../controllers/overlayController.js";
// import * as overlayController from "../controllers/overlayController.js";

const router = express.Router();

router.post("/", createOverlay);
router.get("/", getOverlays);
router.get("/:id", getOverlayById);
router.put("/:id", updateOverlay);
router.delete("/:id", deleteOverlay);

export default router;
