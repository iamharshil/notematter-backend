import type { Request, Response } from "express";
import UserModel from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/encryption";
import logger from "../utils/logger";
import rsp from "../utils/response";

const AuthController = {
	SignUp: async (req: Request, res: Response) => {
		try {
			const data = req.body;

			const exists = await UserModel.findOne({ email: data.email });
			if (exists) {
				return res.status(400).json(rsp.error("Email already registered, please login instead."));
			}

			const hash = await hashPassword(data.password);
			const newUser = new UserModel({
				username: data.username,
				email: data.email,
				password: hash,
			});

			await newUser.save();

			return res.status(201).json(rsp.success("User registered successfully."));
		} catch (error) {
			logger.error(`Error in SignUp:, ${error}`);
			res.status(500).json({ message: "Internal Server Error" });
		}
	},

	Login: async (req: Request, res: Response) => {
		try {
			const data = req.body;
			
			const user = await UserModel.findOne({ email: data.email }).select("+password");
			if (!user) {
				return res.status(400).json(rsp.error("Invalid email or password."));
			}

			const isMatch = await verifyPassword(data.password, user.password);
			if (!isMatch) {
				return res.status(400).json(rsp.error("Invalid email or password."));
			}

			return res.status(200).json(rsp.success("Login successful."));
		} catch (error) {
			logger.error(`Error in Login:, ${error}`);
			res.status(500).json({ message: "Internal Server Error" });
		}
	},
}

export default AuthController;