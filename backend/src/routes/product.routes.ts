import { Router } from "express"
import { productController } from "../controllers/Product";
import ensureAuthMiddlewere from "../middlewares/ensureAuth.middlewate";

const productRoutes = Router();

productRoutes.post("/", ensureAuthMiddlewere, (req, res) => productController.create(req, res));
productRoutes.get("/", (req, res) => productController.getAll(req, res));
productRoutes.get("/:id", (req, res) => productController.getById(req, res));
productRoutes.delete("/:id", ensureAuthMiddlewere, (req, res) => productController.softDeleteById(req, res));
productRoutes.patch("/:id", ensureAuthMiddlewere, (req, res) => productController.update(req, res));


export { productRoutes };