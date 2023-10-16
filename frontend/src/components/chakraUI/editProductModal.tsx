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
import { IEditProductModal, IFormDataEditProduct } from '@/interface/product';
import { useState } from 'react';
import ConfirmEditModal from './confirmProductModal';


export default function EditProductModal({ editIsOpen, editOnClose, product }: IEditProductModal) {

    const [editedProduct, setEditedProduct] = useState(product)
    const [confirmIsOpen, setConfirmIsOpen] = useState(false)

    const confirmOnClose = () => setConfirmIsOpen(false)

    const confirmModal = ConfirmEditModal({ editOnClose, confirmIsOpen, confirmOnClose, editedProduct })



    const form = useForm<IFormDataEditProduct>({
        defaultValues: {
            name: product.name,
            description: product.description,
            price: product.price
        }
    })

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = form

    const onSubmit = async (values: any) => {
        setEditedProduct({ ...values, id: product.id })
        setConfirmIsOpen(true)
    }

    if (!editIsOpen) {
        return null
    }

    return (
        <>
            {confirmModal}
            <Modal isOpen={editIsOpen} onClose={editOnClose}>
                <ModalOverlay />
                <ModalContent
                    noValidate
                    as='form'
                    onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Editar Produto</ModalHeader>
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
                            Editar
                        </Button>
                        <Button onClick={editOnClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
