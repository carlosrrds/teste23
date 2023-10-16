import { Router } from "express"
import { loginController } from "../controllers/User";

const loginRoutes = Router();

loginRoutes.post("/signup", (req, res) => loginController.signUp(req, res));
loginRoutes.post("/signin", (req, res) => loginController.signIn(req, res));

export { loginRoutes };