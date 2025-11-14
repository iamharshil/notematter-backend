import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validate } from "../middlewares/validateRequest";
import { createUserSchema, loginUserSchema } from "../validations/auth.validation";

const authRoute = Router();

authRoute.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

authRoute.post("/signup", validate(createUserSchema), AuthController.SignUp);
authRoute.post("/login", validate(loginUserSchema), AuthController.LogIn);


export default authRoute;