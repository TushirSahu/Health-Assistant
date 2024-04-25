// Import required modules
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { generateCronTabFile } from "./controllers/generateCronTabFile";
import GEMINIAPI from "./models/gemini";
import { geminiAPI } from "./controllers/geminiAPI";

// Create Express app
const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// initalizing gemini model
const model = new GEMINIAPI();

// Define your API endpoint
app.post("/api/crontab", generateCronTabFile);
app.post("/api/generate", geminiAPI);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

export { model };
