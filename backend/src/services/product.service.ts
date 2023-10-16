import { ErrorTypes } from "../errors/errorCatalog";
import { IBuildWhereClausuleResponse, IGetAllProducts, IOrderBy, IPagination, IProductEntity, IProductPayload, IProductResponse } from "../interfaces/IProduct";
import { Product } from "@prisma/client";

export default class ProductService {

    constructor(private _productEntity: IProductEntity) { }

    public async create(productData: IProductPayload): Promise<Product> {
        const { name, description, price } = productData
        await this.createValidate(productData)
        const createdProduct = await this.createProduct(name as string, description as string, price as string)
        return createdProduct
    }

    private async createValidate({ name, description, price }: IProductPayload): Promise<void> {
        await this.validateName(name)
        this.validateDesicription(description)
        this.validatePrice(price)
    }

    private async createProduct(name: string, description: string, price: string): Promise<Product> {
        const normalizeProduct = {
            name,
            description,
            price
        }
        const createdProduct = await this._productEntity.create(normalizeProduct)
        return createdProduct
    }

    public async getAll(payLoad: IGetAllProducts): Promise<IProductResponse[]> {
        const { name, description, priceValue, priceComparisonType, page, limit, field, sort } = payLoad
        const { where, pagination } = this.buildWhereClausule({ name, description, priceValue, priceComparisonType, page, limit })
        const orderBy = this.buildOrderBy(field, sort)
        const allProduct = this._productEntity.getAll(where, pagination, orderBy)
        return allProduct
    }

    public async getById(id: string): Promise<IProductResponse> {
        const productId = this.numericVerify(id)
        const product = await this._productEntity.getById(productId)
        return product
    }

    public async softDeleteById(id: string): Promise<boolean> {
        const productId = this.numericVerify(id)
        await this.existById(productId)
        const deleted = await this._productEntity.softDeleteById(productId)
        return deleted
    }

    public async update(id: string, product: IProductPayload): Promise<IProductResponse> {
        const { name, description, price } = product
        const productId = this.numericVerify(id)
        await this.existById(productId)
        this.validateFieldLenght(name)
        this.validateFieldLenght(description)
        this.validatePositiveNumber(price)
        const productUpdated = await this._productEntity.update(productId, product)
        return productUpdated
    }

    private async validateName(name: string | undefined): Promise<void> {

        if (!name) {
            throw new Error(ErrorTypes.NameRequiredError)
        }

        if (typeof name !== "string") {
            throw new Error(ErrorTypes.NameStringError)
        }

        this.validateFieldLenght(name)


        const isNameRegister = await this._productEntity.existByName(name)

        if (isNameRegister) {
            throw new Error(ErrorTypes.ValidNameError)
        }

    }

    private validateFieldLenght(field: string | undefined, minLength: number = 3, maxLength: number = 255): void {
        if (!field) return
        if (field.length < minLength || field.length > maxLength) {
            throw new Error(ErrorTypes.NameSizeError)
        }
    }

    private validateDesicription(description: string | undefined): void {

        if (!description) {
            throw new Error(ErrorTypes.DescriptionRequiredError)
        }

        if (typeof description !== "string") {
            throw new Error(ErrorTypes.DescriptionStringError)
        }

        this.validateFieldLenght(description, 3, 2000)

    }


    private validatePrice(price: string | undefined): number {

        if (!price) {
            throw new Error(ErrorTypes.PriceRequiseredError)
        }

        const isPositiveNumber = this.validatePositiveNumber(price)
        if (isPositiveNumber) {
            return Number(price)
        }

        throw new Error(ErrorTypes.IdNumberError)
    }

    private numericVerify(params: string): number {

        const numberRegex: RegExp = /^\d+$/

        const isNumeric = numberRegex.test(params);

        if (isNumeric) {
            return Number(params)
        }
        throw new Error(ErrorTypes.IdNumberError)
    }

    private async existById(id: number): Promise<void> {
        const exist = await this._productEntity.verifyId(id)
        if (!exist) {
            throw new Error(ErrorTypes.IdNotFouldError)
        }
    }

    private buildWhereClausule(filter: IGetAllProducts): { where: IBuildWhereClausuleResponse, pagination: IPagination } {
        const { name, description, priceValue, priceComparisonType, page, limit } = filter || {}

        let where: IBuildWhereClausuleResponse = {}

        let pagination: IPagination = {
            page: 1,
            limit: 20
        }

        if (name && typeof name === "string") {
            where.name = {
                contains: name.toLowerCase(),
                mode: 'insensitive'
            }
        }

        if (description && typeof description === "string") {
            where.description = {
                contains: description.toLowerCase(),
                mode: 'insensitive'
            }
        }


        if (this.validatePositiveNumber(priceValue) && (priceComparisonType === "greater" || priceComparisonType === "lower")) {
            const key = priceComparisonType === "lower" ? "lte" : "gte"
            where.price = {
                [key]: priceValue
            }
        }

        if (this.validatePositiveNumber(page)) {
            pagination.page = Number(page)
        }

        if (this.validatePositiveNumber(limit)) {
            pagination.limit = Number(limit)
        }

        return { where, pagination }
    }

    private buildOrderBy(field: string | undefined, order: string | undefined): IOrderBy | {} {

        if (field !== "name" && field !== "description" && field !== "price") {
            return {}
        }

        const sort = order === "asc" ? "asc" : "desc"

        const orderBy = { [field]: sort }

        return orderBy
    }

    private validatePositiveNumber(value: string | undefined): boolean {
        if (!value) return false

        const regex = /^-?\d+(\.\d+)?$/;
        const isNumeric = regex.test(value);

        if (isNumeric && parseFloat(value) >= 0) {
            return true
        }

        throw new Error(ErrorTypes.PriceNumberError)
    }
}