// Import required modules
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Create Express app
const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Define your API endpoint
app.post("/api/crontab", )

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
