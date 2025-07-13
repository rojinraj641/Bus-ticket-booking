import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

//Application level middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin','Content-Type','Accept','Authorization','X-Requested-With'],
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//router import 
import userRouter from "./routes/user.routes.js";
import homeRouter from "./routes/home.routes.js";
import filterRouter from "./routes/filtered.routes.js"
import passengerRouter from "./routes/passengerDetails.routes.js"
import paymentRouter from './routes/payment.routes.js'

//router declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1", homeRouter);
app.use("/api/v1/filtered", filterRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/passengerInfo", passengerRouter);

//Global error handlers
app.use(errorHandler);

export default app;