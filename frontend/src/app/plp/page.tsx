'use client'

import ListProduct from "@/components/chakraUI/listProduct";
import ProtectedRoute from "@/components/protectedRoute";
import { getAllProducts } from "@/redux/features/produtcs/productsActions";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Plp() {

    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.products)

    useEffect(() => {
        const query = window.location.href.split("?")[1]
        dispatch(getAllProducts(`?${query}`))
    }, [])

    return (
        <ProtectedRoute>
            <Stack
                minH={'100vh'}
                direction={'column'}
                align={'center'}
                justify={'center'}
            >
                <ListProduct products={products.productsList} />
            </Stack>
        </ProtectedRoute>
    );
};






