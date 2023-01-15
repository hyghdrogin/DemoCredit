/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
import cors from "cors";
import reqLogger from "./middleware/reqLogger";
import config from "./config";
import router from "./routes/index";
import { CustomRequest } from "./utilities/interface";

const app = express(); // Calling express function
const port = config.PORT || 5000; // Assigning a port

app.use(cors()); // Initializing Cross-Origin Resource Sharing
app.use(express.json()); // Parsing incoming JSON requests and puts the parsed data in req

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}

app.use(reqLogger); // Logging requests
app.use("/api/v1", router); // Running routes

// GET request to homepage
app.get("/", (req, res) => {
  res.send(`Welcome to ${config.APP_NAME} app`);
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  message: "Route not correct kindly check url.",
}));

(async () => {
  app.listen(port, async () => {
    console.log(
      `${config.APP_NAME} API listening on ${port}`
    );
  });
})();

export default app;
