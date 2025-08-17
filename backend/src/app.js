import express from "express";
import cors from "cors";
import overlayRoutes from "./routes/overlayRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/overlays", overlayRoutes);

export default app;
