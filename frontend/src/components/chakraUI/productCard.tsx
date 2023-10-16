'use client'

import { Box, Flex, Text, IconButton, Spacer } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { IProduct } from '@/interface/product';
import EditProductModal from './editProductModal';
import { useState } from 'react';
import DeleteModal from './deleteProductModal';

interface IProps {
    product: IProduct
}

export default function ProductCard(props: IProps) {
    const { product } = props

    const [editIsOpen, setEditIsOpen] = useState(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)

    const editOnClose = () => setEditIsOpen(false)

    const deleteOnClose = () => setDeleteIsOpen(false)

    const editModal = EditProductModal({ editIsOpen, editOnClose, product })

    const deleteModal = DeleteModal({ deleteIsOpen, deleteOnClose, product })

    const handleDelete = () => {
        setDeleteIsOpen(true)
    };

    const handleEdit = () => {
        setEditIsOpen(true)
    };


    return (
        <>
            {editModal}
            {deleteModal}
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                bg="white"
                key={product.id}
                maxW="1200px"
                w="80%"
                mx="auto"
                mb={4}
                minW='300px'
            >
                <Flex
                    direction='row'
                    justify="space-between"
                >
                    <Box maxW={{ base: '180px', sm: "initial" }} >
                        <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
                        <Text color="green.500" mt={2} fontSize="lg">R$ {product.price}</Text>
                        <Text mt={2}>{product.description}</Text>
                    </Box>
                    <Flex
                        align="top"
                        direction="row"
                        justify="flex-start"
                        mt={{ base: 2, sm: 0 }}
                    >
                        <IconButton
                            icon={<EditIcon />}
                            aria-label="Editar"
                            onClick={handleEdit}
                            variant="ghost"
                            mr={2}
                        />
                        <IconButton
                            icon={<DeleteIcon />}
                            aria-label="Excluir"
                            onClick={handleDelete}
                            variant="ghost"
                        />
                    </Flex>
                </Flex>
            </Box>
        </>
    )
};