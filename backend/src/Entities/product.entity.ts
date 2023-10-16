import { Product } from "@prisma/client";
import { IProductPayload, IProductRequest, IProductResponse } from "../interfaces/IProduct";
import { prisma } from "../prisma";
import { ErrorTypes } from "../errors/errorCatalog";


export default class ProductEntity {
    public async create(data: IProductRequest): Promise<Product> {
        const createProduct = await prisma.product.create({
            data
        })
        return createProduct
    }

    public async existByName(name: string): Promise<Boolean> {
        const product = await prisma.product.findUnique({
            where: {
                name,
                activated: true
            }
        })
        if (product) {
            return true
        }
        return false
    }

    public async getAll(where: any, pagination: any, orderBy: any): Promise<IProductResponse[]> {
        const products = await prisma.product.findMany({
            where: {
                activated: true,
                ...where
            },
            orderBy,
            take: pagination.limit,
            skip: (pagination.page - 1) * pagination.limit,
        })
        return products
    }

    public async getById(id: number): Promise<IProductResponse> {
        const product = await prisma.product.findUnique({
            where: {
                id,
                activated: true
            }
        })
        if (product) {
            return product
        }
        throw new Error(ErrorTypes.IdNotFouldError)
    }

    public async softDeleteById(id: number): Promise<boolean> {
        const productDeleted = await prisma.product.update({
            where: {
                id,
                activated: true
            },
            data: {
                activated: false,
                deleted_at: new Date()
            }
        })
        if (productDeleted) {
            return true
        } throw new Error(ErrorTypes.ProductNotFould)
    }

    public async update(id: number, product: IProductPayload): Promise<IProductResponse> {
        const { name, description, price } = product
        const productUpdated = await prisma.product.update({
            where: {
                id,
                activated: true
            },
            data: {
                name,
                description,
                price
            }
        })
        return productUpdated
    }

    public async verifyId(id: number): Promise<boolean> {
        const product = await prisma.product.findUnique({
            where: {
                id,
                activated: true
            }
        })
        if (product) {
            return true
        }
        return false
    }

}