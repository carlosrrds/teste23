import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface IProductEntity {
    create(data: IProductRequest): Promise<Product>
    existByName(name: string): Promise<Boolean>
    getAll(where: any, pagination: any, orderBy: any): Promise<IProductResponse[]>
    getById(id: number): Promise<IProductResponse>
    softDeleteById(id: number): Promise<boolean>
    update(id: number, product: IProductPayload): Promise<IProductResponse>
    verifyId(id: number): Promise<boolean>
}

export interface IProductService {
    create(productData: IProductPayload): Promise<Product>
    getAll(filter: IGetAllProducts): Promise<IProductResponse[]>
    getById(id: string): Promise<IProductResponse>
    softDeleteById(id: string): Promise<boolean>
    update(id: string, product: IProductPayload): Promise<IProductResponse>
}


export interface IProductRequest {
    name: string;
    description: string;
    price: string;
}

export interface IProductPayload {
    name?: string;
    description?: string;
    price?: string;
}

export interface IProductResponse {
    id: number;
    name: string;
    description: string;
    price: Decimal;
    activated: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export interface IGetAllProducts {
    name?: string,
    description?: string
    priceValue?: string
    priceComparisonType?: "greater" | "lower"
    page?: string
    limit?: string
    field?: string
    sort?: string
}

export interface IBuildWhereClausuleResponse {

    name?: {
        contains?: string,
        mode?: string
    },
    description?: {
        contains?: string,
        mode?: string
    }
    price?: {
        gte?: string,
        lte?: string
    }
}

export interface IPagination {
    page: number;
    limit: number;
};

export interface IOrderBy {
    [key: string]: 'asc' | 'desc';
}
