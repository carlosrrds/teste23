'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { INewProductModal } from '@/interface/product';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store/store';
import { getAllProducts } from '@/redux/features/produtcs/productsActions';


export default function NewProductModal({ newIsOpen, newOnClose }: INewProductModal) {

    const dispatch = useDispatch<AppDispatch>()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    const onSubmit = async (values: any) => {
        const token = localStorage.getItem("access_token")

        await axios({
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            url: '/api/products/new',
            data: values
        }
        )
        newOnClose()
        dispatch(getAllProducts());
    }

    if (!newIsOpen) {
        return null
    }

    return (
        <>
            <Modal isOpen={newIsOpen} onClose={newOnClose}>
                <ModalOverlay />
                <ModalContent
                    noValidate
                    as='form'
                    onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Novo Produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id='name' mb={4} isInvalid={errors.name && true}>
                            <FormLabel>Nome</FormLabel>
                            <Input
                                type="text"
                                {...register('name', { required: 'Campo nome obrigatorio', minLength: { value: 3, message: "O nome de ter pelo meno 3 caracteres" }, maxLength: { value: 255, message: "O nome deve ter no maximo 255 caracteres" } })} />
                            <FormErrorMessage>
                                {errors.name && errors.name.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl minW={'100%'} id='description' mb={4} isInvalid={errors.description && true}>
                            <FormLabel>Descrição</FormLabel>
                            <Textarea minW={'100%'}
                                {...register('description', { required: 'Campo descrição obrigatorio', minLength: { value: 3, message: "O nome de ter pelo meno 3 caracteres" }, maxLength: { value: 2000, message: "A descrição deve ter no maximo 2000 caracteres" } })} />
                            <FormErrorMessage>
                                {errors.description && errors.description.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id='price' mb={4} isInvalid={errors.price && true}>
                            <FormLabel>Preço</FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    {...register('price', { required: 'Campo preço obrigatorio', min: { value: 0, message: "O valor tem que ser maior ou igual a 0" } })} />
                            </NumberInput>
                            <FormErrorMessage>
                                {errors.price && errors.price.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}
                            type='submit'
                        >
                            Confirmar
                        </Button>
                        <Button onClick={newOnClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
