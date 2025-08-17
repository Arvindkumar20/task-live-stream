import React from "react";
import { Layers, Video, PencilRuler, Database, Github, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          About — Livestream + Overlay Manager
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          A production-ready starter that plays a livestream and lets you add customizable
          overlays (text/logo) on top—built with React, Node.js (Express) and MongoDB.
        </p>
      </section>

      {/* Highlights */}
      <section className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl shadow p-5 border">
          <Video className="h-6 w-6" />
          <h3 className="mt-3 font-semibold">Livestream Player</h3>
          <p className="text-sm text-gray-600 mt-1">
            Browser-friendly streams (HLS/MP4/WebRTC) with play/pause & volume.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-5 border">
          <PencilRuler className="h-6 w-6" />
          <h3 className="mt-3 font-semibold">Custom Overlays</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add text/logo, set position & size, and manage them via CRUD.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-5 border">
          <Database className="h-6 w-6" />
          <h3 className="mt-3 font-semibold">Clean API</h3>
          <p className="text-sm text-gray-600 mt-1">
            Node + Express + MongoDB with layered controllers/services.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white rounded-2xl shadow p-6 border mb-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-700">
          <li>Frontend loads a browser-compatible stream URL (e.g., HLS <code>.m3u8</code>).</li>
          <li>Overlays are fetched from the API and rendered absolutely over the video.</li>
          <li>Use the editor to create/update overlays (content, x/y, width/height).</li>
          <li>All overlay CRUD operations persist to MongoDB via REST endpoints.</li>
        </ol>
        <div className="mt-4 p-3 rounded-lg bg-gray-50 text-sm text-gray-600">
          Tip: RTSP needs a relay to HLS/DASH/WebRTC before browsers can play it.
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-white rounded-2xl shadow p-6 border mb-10">
        <h2 className="text-xl font-semibold mb-3">Architecture</h2>
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <Layers className="h-5 w-5 mt-1" />
          <pre className="whitespace-pre-wrap overflow-x-auto text-xs sm:text-sm leading-6">
{`frontend/ (React + Tailwind)
  ├─ components/  (VideoPlayer, OverlayEditor, OverlayList, Navbar)
  ├─ pages/       (LandingPage, About, Contact)
  └─ services/    (overlayApi.js)

backend/ (Node + Express + MongoDB)
  ├─ controllers/ (overlayController.js)
  ├─ services/    (overlayService.js)
  ├─ models/      (Overlay.js)
  └─ routes/      (overlayRoutes.js)
`}
          </pre>
        </div>
      </section>

      {/* Links */}
      <section className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/"
          className="flex items-center justify-between bg-white rounded-xl shadow p-4 border hover:shadow-md transition"
        >
          <div>
            <h3 className="font-semibold">Go to App</h3>
            <p className="text-sm text-gray-600">Open the livestream & overlays screen</p>
          </div>
          <Video className="h-5 w-5" />
        </Link>
        <a
          href="/docs/USER_GUIDE.md"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between bg-white rounded-xl shadow p-4 border hover:shadow-md transition"
        >
          <div>
            <h3 className="font-semibold">User Guide</h3>
            <p className="text-sm text-gray-600">Setup, RTSP notes, and tips</p>
          </div>
          <BookOpen className="h-5 w-5" />
        </a>
      </section>

      {/* Footer CTA */}
      <div className="text-center mt-10">
        <a
          href="https://github.com/Arvindkumar20/task-live-stream.git"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white shadow hover:shadow-md transition"
        >
          <Github className="h-5 w-5" />
          <span>View Source</span>
        </a>
      </div>
    </div>
  );
};

export default About;
