import express from "express";
import cors from "cors";
import reqLogger from "./middleware/reqLogger";

const app = express(); // Calling express function
const port = 5000; // Assigning a port

app.use(cors()); // Initializing Cross-Origin Resource Sharing
app.use(express.json()); // Parsing incoming JSON requests and puts the parsed data in req
app.use(reqLogger); // Logging requests

// GET request to homepage
app.get("/", (req, res) => {
  res.send("Welcome to Demo Credit app");
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  message: "Route not correct kindly check url.",
}));

(async () => {
  app.listen(port, async () => {
    console.log(
      `Demo Credit API listening on ${port}`
    );
  });
})();

export default app;
