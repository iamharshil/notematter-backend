import express from "express";
import { pinoHttp } from "pino-http";
import logger from "./utils/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pinoHttp({ logger }));

export default app;