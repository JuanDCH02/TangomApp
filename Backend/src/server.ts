import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes";
import orderRouter from "./routes/order.routes";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());


app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/orders", orderRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});