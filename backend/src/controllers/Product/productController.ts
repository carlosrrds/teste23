import { Request, Response } from "express";
import { IGetAllProducts, IProductEntity, IProductService } from "../../interfaces/IProduct";

export default class ProductController {
    constructor(private _productService: IProductService, private _categoryEntity: IProductEntity) { }
    async create(req: Request, res: Response) {
        const { name, description, price } = req.body
        const product = await this._productService.create({ name, description, price })
        return res.status(201).json(product)
    }

    public async getAll(req: Request, res: Response) {
        const products = await this._productService.getAll(req.query as unknown as IGetAllProducts)
        return res.status(200).json(products)
    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params
        const product = await this._productService.getById(id)
        return res.status(200).json(product)
    }

    public async softDeleteById(req: Request, res: Response) {
        const { id } = req.params
        await this._productService.softDeleteById(id)
        return res.status(204).send()
    }

    public async update(req: Request, res: Response) {
        const { name, description, price } = req.body
        const { id } = req.params
        const productUpdated = await this._productService.update(id, { name, description, price })
        return res.status(200).json(productUpdated)
    }
}