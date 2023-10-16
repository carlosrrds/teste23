import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getNextPage } from "./productsActions";
import { IProductSliceInitialState } from "@/interface/product";

const initialState: IProductSliceInitialState = {
    loading: false,
    success: false,
    productsList: [],
    error: null
}


const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setToInitalState(state, action) {
            state = initialState
        },
        loadInitialItems: (state, action) => {
            state.productsList = action.payload;
        },
        loadNextPage: (state, action) => {
            state.productsList = [...state.productsList, ...action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
        })

        builder.addCase(getNextPage.fulfilled, (state, action) => {
        })
    },
});
export const { setToInitalState, loadInitialItems, loadNextPage } = productsSlice.actions
export default productsSlice.reducer
