import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRouters from "./routes/auth.routes.js";
import taskRouters from "./routes/task.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

//swagger
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configs/swagger.js";


const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/tasks", taskRouters);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handler MUST be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
