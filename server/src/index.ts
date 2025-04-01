import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import colors from "colors"; 
/* ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashBoardRoutes";
import productRoutes from "./routes/productRoutes";

//* Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
morgan.format(
  "coloredCommon",
  `${colors.green(":method")} ${colors.yellow(":url")} ${colors.cyan(
    ":status"
  )} ${colors.magenta(":response-time ms")}`
);
app.use(morgan("coloredCommon"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//* Routes
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);

//* Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.green);
});
