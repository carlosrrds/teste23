import ProductEntity from "../../Entities/product.entity";
import ProductService from "../../services/product.service";
import ProductController from "./productController";

export default class ProductControllerFactory {
    static Make() {
        const productEntity = new ProductEntity()
        const productService = new ProductService(productEntity)
        const productController = new ProductController(productService, productEntity)
        return productController
    }
}