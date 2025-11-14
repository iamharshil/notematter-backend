import http from "node:http";
import app from "./app";
import env from "./config/env";
import logger from "./utils/logger";

const server = http.createServer(app);

server.listen(env.PORT, () => {
	logger.info(`Server is running on port ${env.PORT}`);
});
