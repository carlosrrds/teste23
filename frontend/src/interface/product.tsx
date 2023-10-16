import { SetStateAction } from "react"

export interface IProduct {
    id: number
    name: string,
    description: string,
    price: string,
}

export interface IEditProductModal {
    editIsOpen: boolean,
    editOnClose: () => void,
    product: IProduct
}

export interface INewProductModal {
    newIsOpen: boolean,
    newOnClose: () => void,
}

export interface IFormDataEditProduct {
    name: string,
    description: string,
    price: string
}

export interface IConfirmEditProductModal {
    editOnClose: () => void,
    confirmIsOpen: boolean,
    confirmOnClose: () => void,
    editedProduct: IProduct
}

export interface IDeleteProductModal {
    deleteIsOpen: boolean,
    deleteOnClose: () => void,
    product: IProduct
}

export interface IProductSliceInitialState {
    loading: boolean,
    success: boolean,
    productsList: IProduct[],
    error: any
}

export interface ISearchPrams {
    search: string
    searchType: string
    priceComparisonType?: string
}
