'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  keyframes,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import IsLogged from '@/components/isLogged'


const animation = keyframes`  
from {
  transform: translateX(100%);
}
to {
  transform: translateX(0);
}`


export default function SignIn() {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmePassword, setShowConfirmePassword] = useState(false)

  const route = useRouter()

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleShowConfirmePassword = () => setShowConfirmePassword(!showConfirmePassword)

  const slideAnimation = `
    ${animation} 0.5s ease-out
  `

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values: any) => {
    const res = await axios(
      {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        url: '/api/signup',
        data: values
      }
    )
    if (res && res.status == 200) {
      localStorage.setItem('access_token', res.data.token);
      route.push('/plp')
    }
  }



  return (
    <IsLogged>
      <Stack minH={'100vh'} direction={{ base: 'column-reverse', md: 'row' }}>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              '/signUpBanner.webp'
            }
          />
        </Flex >
        <Flex animation={slideAnimation} p={8} flex={1} align={'center'} justify={'center'}>
          <Stack
            noValidate
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            spacing={4}
            w={'full'}
            maxW={'md'}>
            <Heading fontSize={'2xl'}>Faça seu cadastro</Heading>
            <FormControl id="name" isRequired isInvalid={errors.name && true} >
              <FormLabel>Nome de usuario</FormLabel>
              <Input type="text"
                {...register('name', { required: "Campo nome obrigatório", minLength: { value: 3, message: "O nome de ter pelo meno 3 caracteres" }, maxLength: { value: 255, message: "O nome deve ter no maximo 255 caracteres" } })} />
              <FormErrorMessage>
                {errors.name && errors.name.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="email" isRequired isInvalid={errors.email && true}>
              <FormLabel>Endereço de email</FormLabel>
              <Input type="email"
                {...register("email", {
                  pattern: {
                    value: new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), message: "Digite um email valido"
                  }, required: "Campo email obrigatório", minLength: { value: 3, message: "O nome de ter pelo meno 3 caracteres" }, maxLength: { value: 255, message: "O nome deve ter no maximo 255 caracteres" }
                })} />
              <FormErrorMessage>
                {errors.email && errors.email.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={errors.password && true}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: "Campo password obrigatório", minLength: { value: 3, message: "O password de ter pelo meno 3 caracteres" }, maxLength: { value: 255, message: "O password deve ter no maximo 255 caracteres" } })} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={handleShowPassword}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="confirm_password" isRequired isInvalid={errors.confirm_password && true}>
              <FormLabel>Confirme a senha</FormLabel>
              <InputGroup>
                <Input type={showConfirmePassword ? 'text' : 'password'} {...register("confirm_password", { validate: (value: string) => { if (watch('password') !== value) { return "O confirmação não confere com password" } } })} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={handleShowConfirmePassword}>
                    {showConfirmePassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.confirm_password && errors.confirm_password.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Button type='submit' bg={'#CCD500'} variant={'solid'} _hover={{ bg: '#CCD500' }} >
                CADASTRAR
              </Button>
            </Stack>
          </Stack>
        </Flex >
      </Stack >
    </IsLogged>
  )
}