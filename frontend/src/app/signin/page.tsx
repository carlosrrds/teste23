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
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import IsLogged from '@/components/isLogged'

const animation = keyframes`  
from {
  transform: translateX(-100%);
}
to {
  transform: translateX(0);
}`

export default function SignIn() {

  const route = useRouter()

  const slideAnimation = `
  ${animation} 0.5s ease-out
`
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values: any) => {
    const res = await axios(
      {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        url: '/api/signin',
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
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex
          noValidate
          as='form'
          onSubmit={handleSubmit(onSubmit)}
          animation={slideAnimation}
          p={8}
          flex={1}
          align={'center'}
          justify={'center'}>
          <Stack spacing={4}
            w={'full'}
            maxW={'md'}>
            <Heading fontSize={'2xl'}>
              Gerenciador de produtos
            </Heading>
            <FormControl id="email"
              isInvalid={errors.email && true}>
              <FormLabel>
                Endereço de email
              </FormLabel>
              <Input type="email"
                {...register("email", { required: "Campo email obrigatório" })} />
              <FormErrorMessage>
                {errors.email && errors.email.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={errors.password && true}>
              <FormLabel>
                Senha
              </FormLabel>
              <Input type="password"
                {...register("password", { required: "Campo password obrigatório" })} />
              <FormErrorMessage>
                {errors.password && errors.password.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Button type='submit'
                bg={'#CCD500'}
                variant={'solid'}
                _hover={{ bg: '#CCD500' }} >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              '/signInBanner.webp'
            }
          />
        </Flex>
      </Stack>
    </IsLogged>
  )
}