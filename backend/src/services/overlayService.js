import Overlay from "../models/Overlay.js";

export const createOverlay = (data) => Overlay.create(data);
export const getOverlays = () => Overlay.find();
export const getOverlayById = (id) => Overlay.findById(id);
export const updateOverlay = (id, data) => Overlay.findByIdAndUpdate(id, data, { new: true });
export const deleteOverlay = (id) => Overlay.findByIdAndDelete(id);
