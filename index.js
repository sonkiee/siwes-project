import express from "express";
import routes from "./src/routes/index.js";
import initDB from "./src/db/index.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initDB();
    app.listen(PORT, "localhost", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server");
  }
})();
