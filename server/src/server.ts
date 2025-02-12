import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
