import { Router } from "express";
import authRoute from "./auth.route";

const routes = Router();

routes.get("/health", (_, res) => res.send("OK"));

routes.use("/auth", authRoute);

export default routes;
