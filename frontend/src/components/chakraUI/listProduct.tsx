'use client'

import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import ProductCard from './productCard';
import { IProduct } from '@/interface/product';
import ProductSearchList from './productSearchLista';
import { useState } from 'react';
import NewProductModal from './newProductModal';
import { AddIcon } from '@chakra-ui/icons';
import { getAllProducts, getNextPage } from '@/redux/features/produtcs/productsActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { useRouter } from 'next/navigation';

interface IProps {
    products: IProduct[]
}


export default function ListProduct(props: IProps) {
    const { products } = props
    const [newIsOpen, setNewIsOpen] = useState(false)
    const newOnClose = () => setNewIsOpen(false)
    const newModal = NewProductModal({ newIsOpen, newOnClose })
    const dispatch = useDispatch<AppDispatch>()
    const route = useRouter()

    const handleNew = () => {
        setNewIsOpen(true)
    };

    const handleMoreProducts = () => {
        const url = window.location.href
        const query = url.split("?")[1] || ""
        const page = parseInt(query.split("page=")[1]) || 1
        const pageParam = `&page=${page + 1}`
        const newQuery = `${query.split("&page=")[0] || query.split("&page=")[0] || ""}${pageParam}`
        dispatch(getNextPage(`?${newQuery}`))
        route.push(`?${newQuery}`)
    }

    return (
        <>
            {newModal}
            <Flex flexDirection={'column'} align={'center'} minH={'100vh'}>
                <ProductSearchList />
                <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="md"
                    bg="transparent"
                    maxW="1200px"
                    w="80%"
                    h={'40px'}
                    mx="auto"
                    mb={4}
                    minW='300px'
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <IconButton
                        icon={<AddIcon color="green.500" />}
                        aria-label="Adicionar Novo Produto"
                        onClick={handleNew}
                        bg="transparent"
                    />
                    <VStack spacing={2} align="flex-end">
                        <button onClick={handleNew}>
                            Adicionar Novo Produto
                        </button>
                    </VStack>
                </Box>
                <h1>itens: {products.length}</h1>
                <VStack spacing={4} w="100vw" maxW="1200px" align="center">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </VStack>
                <button onClick={handleMoreProducts}>MAIS PRODUTOS</button>
            </Flex>
        </>
    )

};

