import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
