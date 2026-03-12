import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API running");
// });
app.use("/products", productRouter);
app.use("/category", categoryRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});