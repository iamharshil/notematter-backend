import mongoose from "mongoose";
import logger from "../utils/logger";

export const connectDatabase = async () => {
	try {
		mongoose.set("strictQuery", true);
		mongoose.set("sanitizeFilter", true);
		mongoose.set("runValidators", true);

		await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/notematter", {
			readPreference: "secondary",
		} as mongoose.ConnectOptions);
		logger.info("Database connected successfully");
	} catch (error) {
		logger.error(`Database connection error:", ${error}`);
		process.exit(1);
	}
};

export const disconnectDatabase = async () => {
	try {
		await mongoose.disconnect();
		logger.info("Database disconnected successfully");
	} catch (error) {
		logger.error(`Database disconnection error:, ${error}`);
	}
};