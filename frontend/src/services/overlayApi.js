import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/overlays";

// Get all overlays
export const getOverlays = () =>
  axios.get(API_URL).then((res) => res.data);

// Create overlay
export const createOverlay = (overlay) =>
  axios.post(API_URL, overlay).then((res) => res.data);

// Update overlay
export const updateOverlay = (id, overlay) =>
  axios.put(`${API_URL}/${id}`, overlay).then((res) => res.data);

// Delete overlay
export const deleteOverlay = (id) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data);
