import { Router } from "express";
import { loginRoutes } from "./login.routes";
import { productRoutes } from "./product.routes";


const routes = Router()

routes.use("/products", productRoutes)
routes.use("/login", loginRoutes)

export { routes }