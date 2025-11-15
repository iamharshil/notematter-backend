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
			if (!user?._id) {
				return res.status(400).json(rsp.error("Invalid email or password."));
			}

			const isMatch = await verifyPassword(data.password, user.password);
			if (!isMatch) {
				return res.status(400).json(rsp.error("Invalid email or password."));
			}

			req.session.user = user._id.toString();
			req.session.save();
			return res.status(200).json(rsp.success("Login successful."));
		} catch (error) {
			logger.error(`Error in Login:, ${error}`);
			res.status(500).json({ message: "Internal Server Error" });
		}
	},

	verify: async  (req: Request, res: Response) => {
		try {
			const userSession = req.session.user;

			if (!userSession) {
				req.session.destroy;
				return res.status(401).json(rsp.auth());
			}

			const user = await UserModel.findById(userSession);
			if (!user?._id) {
				req.session.destroy;
				return res.status(401).json(rsp.auth());
			}

			const data = {
				username: user.username,
				email: user.email
			}

			return res.status(200).json(rsp.success("", data));
		} catch (error) {
			req.session.destroy;
			console.error("error", error);
			return res.status(500).json(rsp.internal);
		}
	}
};

export default AuthController;