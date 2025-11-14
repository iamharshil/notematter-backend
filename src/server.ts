import http from "node:http";
import app from "./app";
import { connectDatabase, disconnectDatabase } from "./config/database";
import env from "./config/env";
import logger from "./utils/logger";

const server = http.createServer(app);

server.listen(env.PORT, async () => {
	logger.info(`Server is running on port ${env.PORT}`);
	await connectDatabase();
});

process.on("unhandledRejection", async (error) => {
	logger.error(`Unhandled Rejection at:, ${error}`);
	await disconnectDatabase();
});

process.on("uncaughtException", async (error) => {
	logger.error(`Uncaught Exception thrown:, ${error.message}`);
	await disconnectDatabase();
	process.exit(1);
});