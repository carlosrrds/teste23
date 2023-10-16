import { IDeleteProductModal } from "@/interface/product";
import { getAllProducts } from "@/redux/features/produtcs/productsActions";
import { AppDispatch } from "@/redux/store/store";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    Checkbox,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";



export default function DeleteModal({ deleteIsOpen, deleteOnClose, product }: IDeleteProductModal) {
    const [isDeleteChecked, setDeleteChecked] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const handleDelete = async () => {
        const token = localStorage.getItem("access_token")

        await axios(
            {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`

                },
                url: `/api/products/${product.id}`,
            }
        )
        const query = window.location.href.split("?")[1]
        dispatch(getAllProducts(`?${query}`))
        deleteOnClose()
    }

    return (
        <Modal isOpen={deleteIsOpen} onClose={deleteOnClose} size="md">
            <ModalOverlay justifyContent="center" />
            <ModalContent alignItems="center">
                <ModalHeader>Confirmar Exclusão</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Nome: {product.name}</Text>
                    <Text>Descrição: {product.description}</Text>
                    <Text>Preço: {product.price}</Text>
                    <FormControl>
                        <Checkbox
                            isChecked={isDeleteChecked}
                            onChange={() => setDeleteChecked(!isDeleteChecked)}
                        >
                            Deletar o produto
                        </Checkbox>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={3}
                        onClick={handleDelete}
                        isDisabled={!isDeleteChecked}
                    >
                        Confirmar
                    </Button>
                    <Button onClick={deleteOnClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );;
};
