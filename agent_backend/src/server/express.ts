import express from "express";
import cors from "cors"; // Import cors
import { notFound, errorHandler } from "./middlewares";
import { apiRouter } from "./api";

export const app = express();

// Enable CORS for all origins (for development)
// For production, configure it more restrictively: app.use(cors({ origin: 'your_frontend_domain' }));
app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);

// Middlewares to handle 404 errors and other errors
// Do not put any routes after this
app.use(notFound);
app.use(errorHandler);
