# User Guide — Livestream with Overlays (React + Node + MongoDB)

This guide explains how to install, run, and use the app: a landing page that plays a livestream and supports adding **custom overlays** (text/logo) with full CRUD. It follows the task brief: livestream from an **RTSP URL**, overlays can be **positioned & resized**, and documentation is included. fileciteturn0file0

---

## 1) Features at a Glance

- Landing page with an embedded livestream player (Play, Pause, Volume).
- Create, view, update, delete overlays (text or logo URL). 
- Overlays render on top of the video at configured `x/y/width/height`.
- Node.js + Express backend (MongoDB) with clean layered code.
- React + Tailwind frontend with components for player and overlay editor.

---

## 2) Prerequisites

- **Node.js** (>= 18)
- **MongoDB** (local or cloud MongoDB Atlas)
- **Git** (optional)
- An **RTSP** stream URL (e.g., from `rtsp.me` or `rtsp.stream` as suggested in the PDF). The app expects you to relay RTSP to a browser‑compatible format; see section **6**. fileciteturn0file0

---

## 3) Project Setup

### A. Clone and Install

```bash
# from your workspace
git clone <your-repo-url> livestream-overlays
cd livestream-overlays

# backend
cd backend
cp .env.example .env
npm install

# frontend (in a second terminal)
cd ../frontend
cp .env.example .env
npm install
```

### B. Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/livestream_overlays
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000
VITE_STREAM_URL=http://localhost:5173/sample-video.mp4
```
> `VITE_STREAM_URL` is the URL your video `<video>` tag will play. For a real RTSP camera, you’ll set up a relay to HLS/DASH/WebRTC and then put that browser‑friendly URL here.

---

## 4) Running the App (Dev)

Open two terminals:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev   # nodemon start (configure in package.json)
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev   # Vite dev server
```

- Backend runs at `http://localhost:5000`
- Frontend runs at `http://localhost:5173` (default)

---

## 5) Using the App

1. Open the frontend in your browser.
2. The landing page shows the player. If `VITE_STREAM_URL` is a valid HLS/MP4/DASH/WebRTC URL, the video loads.
3. Use the **Overlay Editor** to add a text/logo overlay:
   - Enter `content` (text or image URL).
   - Set `x` and `y` (top-left position in pixels).
   - (Optional) Adjust `width` and `height` if your editor exposes them.
4. Click **Save**. The overlay is stored in MongoDB via the API and renders on top of the video.
5. Overlays can be edited or deleted from the UI (or via API using the documented endpoints in `API.md`).

---

## 6) RTSP in Browsers — How to Make It Work

Browsers cannot play RTSP **directly**. You have to convert or relay RTSP into a browser-friendly stream. Here are three practical options:

### Option A — RTSP → HLS using FFmpeg (simple and robust)
1. On your machine/server, run FFmpeg to pull RTSP and produce HLS output:
   ```bash
   ffmpeg -rtsp_transport tcp -i "rtsp://<user>:<pass>@<camera-ip>:554/stream"      -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -f hls      -hls_time 2 -hls_list_size 6 -hls_flags delete_segments      ./public/hls/stream.m3u8
   ```
2. Serve the `./public/hls` directory (e.g., from your frontend dev server or a static server).
3. Set `VITE_STREAM_URL` to the public URL of `stream.m3u8`.

### Option B — RTSP → WebRTC (low latency)
- Use a gateway/relay (e.g., a Node or Go tool) that ingests RTSP and publishes **WebRTC**. Then set `VITE_STREAM_URL` to the WebRTC player page or use a compatible WebRTC player component.

### Option C — RTSP test sources
- For quick demos, sites like `rtsp.me` or `rtsp.stream` can provide temporary RTSP links as mentioned in the task PDF. You’ll still need to relay them to HLS/DASH/WebRTC to view in the browser. fileciteturn0file0

> Tip: For the absolute quickest local demo, skip RTSP and test with an MP4 or HLS sample URL first. Once the overlay flow works, switch to a proper RTSP relay.

---

## 7) API Summary (Quick Reference)

See **docs/API.md** for full details.

- `POST   /api/overlays` — Create overlay
- `GET    /api/overlays` — List overlays
- `GET    /api/overlays/:id` — Get overlay
- `PUT    /api/overlays/:id` — Update overlay
- `DELETE /api/overlays/:id` — Delete overlay

---

## 8) Customization Ideas

- Add overlay types: shapes, rich text, image upload, QR codes.
- Add `zIndex`, `opacity`, `rotation`, `font`, `color`, `bg`, `border`.
- Add drag‑and‑drop and resizable UI (e.g., with a React library).
- Multi‑user auth (JWT) & per‑user overlays.
- Project/workspace concept for grouping overlays per stream.
- Autosave and version history.

---

## 9) Troubleshooting

- **Video not playing**: Verify that `VITE_STREAM_URL` is an HLS (`.m3u8`), MP4, DASH (`.mpd`), or WebRTC URL. RTSP will not play directly in most browsers.
- **CORS errors**: Ensure backend has `cors()` enabled and that the player’s video URL is allowed by the server hosting the stream segments.
- **Overlay not visible**: Check `position` and `size` values. Also confirm overlay exists via `GET /api/overlays`.
- **MongoDB connection fails**: Confirm `MONGO_URI` and that MongoDB is running or accessible over the network.

---

## 10) Deliverables Checklist

- ✅ **Code Repo** (frontend + backend)
- ✅ **API Documentation** (this repo `docs/API.md`)
- ✅ **User Documentation** (this file) with RTSP notes per PDF (input RTSP URL, stream relay guidance, overlay management). fileciteturn0file0

