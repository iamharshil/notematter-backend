import z from "zod";

export const createUserSchema = z.object({
	body: z.object({
		username: z
			.string()
			.min(3)
			.max(20)
			.regex(/^[a-zA-Z0-9_]+$/),
		email: z.email(),
		password: z
			.string()
			.min(8)
			.max(100)
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
	}),
});

export const loginUserSchema = z.object({
	body: z.object({
		email: z.email(),
		password: z.string().min(8).max(100),
	}),
});