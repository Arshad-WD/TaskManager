import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";


//Routers
import authRouters from "./routes/auth.routes.js";
import taskRouters from "./routes/task.routes.js";
import adminRouters from "./routes/admin.routes.js";

//Middlewares
import { errorHandler } from "./middlewares/error.middleware.js";
import logger from "./configs/logger.js";

//swagger
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configs/swagger.js";


const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use("/api", limiter);

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/tasks", taskRouters);
app.use("/api/v1/admin", adminRouters);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Primetrade Engine established on port ${PORT}`);
});
