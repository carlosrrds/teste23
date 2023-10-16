'use client'

import IsLogged from '@/components/isLogged'
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  keyframes,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const animation = keyframes`  
from {
  opacity:0
}
to {
  opacity:1 
}`


export default function Home() {

  const router = useRouter()

  const fadeAnimation = `
  ${animation} 2.0s ease
`



  return (
    <IsLogged>
      <Stack animation={fadeAnimation} minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}>
                Gerenciador de Produtos
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Desfrute de uma gestão de produtos eficiente.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                onClick={() => router.push('/signup')}
                rounded={'0'}
                boxShadow={'none'}
                borderBottom={'1px solid'}
                fontWeight={'700'}
                bg={'transparent'}
                padding={'0'}
              >
                CADASTRE-SE
              </Button>
              <Button
                onClick={() => router.push('/signin')}
                fontWeight={'700'}
                rounded={'10px'}
                bg={'#CCD500'}
                _hover={{
                  bg: '#CCD500',
                }}>
                ENTRAR
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src='/homeBanner.webp'
          />
        </Flex>
      </Stack>
    </IsLogged>
  )
}