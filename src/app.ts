import cookieParser from "cookie-parser";
import cors from "cors";
import csurf from "csurf";
import express from "express";
import rateLimit from "express-rate-limit";
import session from "express-session";
import hpp from "hpp";
import morgan from "morgan";
import { pinoHttp } from "pino-http";
import env from "./config/env";
import { errorHandler } from "./middlewares/error-handler";
import Sanitize from "./middlewares/mongo-sanitize";
import { notFound } from "./middlewares/not-found";
import routes from "./routes/index.route";

const app = express();

// app.use(pinoHttp({ logger, useLevel: "info" }));
app.use(morgan("dev"));
app.use(cors({
	origin: env.SITE_URL,
	credentials: true,
}));
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: env.isProd },
}));

app.use(hpp());
app.use(csurf({ cookie: {
	httpOnly: true,
	secure: env.isProd,
	sameSite: env.isProd ? "strict" : "lax",
} }));
app.use(Sanitize);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;