import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { loadInitialItems, loadNextPage } from "./products"


export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (queryParams: string | undefined, { dispatch }) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const products = await axios.get(
                `api/products/list${queryParams}`,
                config
            )
            dispatch(loadInitialItems(products.data))
            return products.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getNextPage = createAsyncThunk(
    'products/getNextPage',
    async (queryParams: string | undefined, { dispatch }) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const products = await axios.get(
                `api/products/list${queryParams}`,
                config
            )
            dispatch(loadNextPage(products.data))
            return products.data
        } catch (error) {
            console.log(error)
        }
    }
)