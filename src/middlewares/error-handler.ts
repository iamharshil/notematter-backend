import type { Request, Response } from "express";
import logger from "../utils/logger";

export function errorHandler(err: any, req: Request, res: Response): void {
	logger.error(err);
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
}