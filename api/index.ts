import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
(async () => {
    // For Vercel, we don't need the HTTP server, just the Express app
    await registerRoutes(null as any, app);
})();

// Export for Vercel serverless
export default app;
