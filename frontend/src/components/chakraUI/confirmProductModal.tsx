'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
} from "@chakra-ui/react";
import { IConfirmEditProductModal } from "@/interface/product";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { getAllProducts } from "@/redux/features/produtcs/productsActions";


export default function ConfirmEditModal({ editOnClose, confirmIsOpen, confirmOnClose, editedProduct }: IConfirmEditProductModal) {

    const dispatch = useDispatch<AppDispatch>()

    const handlePatch = async () => {
        const token = localStorage.getItem("access_token")

        await axios(
            {
                method: 'patch',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                url: `/api/products/${editedProduct.id}`,
                data: editedProduct
            }
        )
        dispatch(getAllProducts());
        editOnClose()
        confirmOnClose()
    }

    if (!confirmIsOpen) {
        return null
    }

    return (
        <Modal isOpen={confirmIsOpen} onClose={confirmOnClose}>
            <ModalOverlay justifyContent="center" />
            <ModalContent mt={'150px'} alignItems="center">
                <ModalHeader>Visualizar Mudanças</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Nome: {editedProduct.name}</Text>
                    <Text>Descrição: {editedProduct.description}</Text>
                    <Text>Preço: R${editedProduct.price}.</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handlePatch}>
                        Confirmar
                    </Button>
                    <Button onClick={confirmOnClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};