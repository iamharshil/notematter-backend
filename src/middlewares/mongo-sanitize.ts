import type { NextFunction, Request, Response } from "express";
import MongoSanitize from "express-mongo-sanitize";

const Sanitize = (req: Request, _: Response, next: NextFunction) => {
	if (req.body) {
		req.body = MongoSanitize.sanitize(req.body);
	}

	if (req.params) {
		req.params = MongoSanitize.sanitize(req.params);
	}

	if (req.query && typeof req.query === "object") {
		// Create a sanitized copy
		const sanitized = MongoSanitize.sanitize({ ...req.query }) as Record<
			string,
			unknown
		>;

		// Clear existing query keys (must mutate, not reassign)
		for (const key of Object.keys(req.query)) {
			delete (req.query as Record<string, unknown>)[key];
		}

		// Apply sanitized fields
		Object.assign(req.query as Record<string, unknown>, sanitized);
	}

	next();
};

export default Sanitize;