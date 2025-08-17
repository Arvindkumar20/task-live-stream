import * as overlayService from "../services/overlayService.js";

export const create = async (req, res) => {
  try {
    const overlay = await overlayService.createOverlay(req.body);
    res.status(201).json(overlay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  const overlays = await overlayService.getOverlays();
  res.json(overlays);
};

export const getOne = async (req, res) => {
  const overlay = await overlayService.getOverlayById(req.params.id);
  overlay ? res.json(overlay) : res.status(404).json({ message: "Not found" });
};

export const update = async (req, res) => {
  const updated = await overlayService.updateOverlay(req.params.id, req.body);
  updated ? res.json(updated) : res.status(404).json({ message: "Not found" });
};

export const remove = async (req, res) => {
  await overlayService.deleteOverlay(req.params.id);
  res.json({ message: "Deleted successfully" });
};
