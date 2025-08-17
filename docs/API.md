# Overlay & Livestream API Documentation (Node.js + Express)

This document describes the REST API for managing **overlays** that render on top of the livestream player. It matches the requirements from the task PDF (livestream from an RTSP URL, overlays with CRUD) and the Node/Express implementation we designed. fileciteturn0file0

---

## Base URL

- Local development: `http://localhost:5000`
- Base path for this API: `/api/overlays`

All responses are JSON. Send `Content-Type: application/json` for requests with a body.

No authentication is required in the starter; you can add JWT later if needed.

---

## Data Model

### Overlay

```json
{
  "_id": "6657c9e1d4c5a7b8f9012345",
  "content": "SALE 50% OFF",      // text or image/logo URL
  "position": { "x": 24, "y": 36 }, // absolute px within the video container
  "size": { "width": 180, "height": 48 }, // px size of the overlay box
  "createdAt": "2025-08-17T10:21:07.123Z",
  "updatedAt": "2025-08-17T10:21:07.123Z"
}
```

- **content**: String (required). Can be plain text or an image/logo URL (client decides how to render).
- **position**: Object with numeric `x`, `y` in pixels.
- **size**: Object with numeric `width`, `height` in pixels.

> Note: You can extend the schema with `opacity`, `rotation`, `font`, `color`, or `zIndex` if needed.

---

## Endpoints

### 1) Create Overlay

**POST** `/api/overlays`

**Body**

```json
{
  "content": "Welcome to the stream!",
  "position": { "x": 20, "y": 20 },
  "size": { "width": 200, "height": 40 }
}
```

**201 Created**

```json
{
  "_id": "6657c9e1d4c5a7b8f9012345",
  "content": "Welcome to the stream!",
  "position": { "x": 20, "y": 20 },
  "size": { "width": 200, "height": 40 },
  "createdAt": "2025-08-17T10:21:07.123Z",
  "updatedAt": "2025-08-17T10:21:07.123Z",
  "__v": 0
}
```

**cURL**

```bash
curl -X POST http://localhost:5000/api/overlays   -H "Content-Type: application/json"   -d '{"content":"Welcome to the stream!","position":{"x":20,"y":20},"size":{"width":200,"height":40}}'
```

---

### 2) List Overlays

**GET** `/api/overlays`

**200 OK**

```json
[
  {
    "_id": "6657c9e1d4c5a7b8f9012345",
    "content": "Welcome to the stream!",
    "position": { "x": 20, "y": 20 },
    "size": { "width": 200, "height": 40 },
    "createdAt": "2025-08-17T10:21:07.123Z",
    "updatedAt": "2025-08-17T10:21:07.123Z"
  }
]
```

**cURL**

```bash
curl http://localhost:5000/api/overlays
```

---

### 3) Get One Overlay

**GET** `/api/overlays/:id`

**200 OK**

```json
{
  "_id": "6657c9e1d4c5a7b8f9012345",
  "content": "Welcome to the stream!",
  "position": { "x": 20, "y": 20 },
  "size": { "width": 200, "height": 40 },
  "createdAt": "2025-08-17T10:21:07.123Z",
  "updatedAt": "2025-08-17T10:21:07.123Z"
}
```

**404 Not Found**

```json
{ "message": "Not found" }
```

**cURL**

```bash
curl http://localhost:5000/api/overlays/6657c9e1d4c5a7b8f9012345
```

---

### 4) Update Overlay

**PUT** `/api/overlays/:id`

**Body** (any subset of fields)

```json
{
  "content": "Updated banner",
  "position": { "x": 50, "y": 60 }
}
```

**200 OK**

```json
{
  "_id": "6657c9e1d4c5a7b8f9012345",
  "content": "Updated banner",
  "position": { "x": 50, "y": 60 },
  "size": { "width": 200, "height": 40 },
  "createdAt": "2025-08-17T10:21:07.123Z",
  "updatedAt": "2025-08-17T10:29:09.456Z"
}
```

**cURL**

```bash
curl -X PUT http://localhost:5000/api/overlays/6657c9e1d4c5a7b8f9012345   -H "Content-Type: application/json"   -d '{"content":"Updated banner","position":{"x":50,"y":60}}'
```

---

### 5) Delete Overlay

**DELETE** `/api/overlays/:id`

**200 OK**

```json
{ "message": "Deleted successfully" }
```

**cURL**

```bash
curl -X DELETE http://localhost:5000/api/overlays/6657c9e1d4c5a7b8f9012345
```

---

## Validation & Error Responses

- **400 Bad Request** – Invalid body (e.g., `content` missing).
- **404 Not Found** – Overlay not found for given `:id`.
- **500 Internal Server Error** – Database/Server error (check server logs).

Example error:
```json
{ "message": "Validation failed: content is required" }
```

---

## Versioning

Prefixed routes with `/api/` for clarity. If you introduce breaking changes later, you can version via `/api/v2/overlays`.

---

## Notes on Livestream (RTSP)

The app displays a livestream on the landing page and lets users play/pause and control volume. The PDF requires an **RTSP** source (e.g., from rtsp.me or rtsp.stream). Browsers don’t play RTSP directly; you should relay RTSP to a browser‑friendly format (HLS/DASH/WebRTC) or use a compatible player. The user guide explains options and setup. fileciteturn0file0

