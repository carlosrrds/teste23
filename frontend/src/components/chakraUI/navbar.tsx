'use client'

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import logo from "../../assets/images/logo.svg"
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavBar() {
  const router = useRouter()
  const path = usePathname()


  const handleLogout = () => {
    localStorage.removeItem("access_token")
    router.push("/")
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}>
      <Flex
        justifyContent={'space-between'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'88px'}
        maxW={'1200px'}
        margin={'0 auto'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex cursor={'pointer'} justify={{ base: 'center', md: 'start' }}>
          <Image onClick={() => router.push('/')} src={logo} alt='' />
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {path === "/plp" ? (
            <Button
              onClick={handleLogout}
              display={{ base: 'none', md: 'inline-flex', }}
              color={'#4C4C4C'} as={'a'}
              fontSize={{ base: 'smaller', md: "md" }}
              fontWeight={700} variant={'link'}
              href={'#'}
              borderBottom={'1px solid'}
              rounded={'0'}>
              SAIR
            </Button>)
            :
            (
              <>
                <Button
                  onClick={() => router.push('/signup')}
                  display={{ base: 'none', md: 'inline-flex', }}
                  color={'#4C4C4C'} as={'a'}
                  fontSize={{ base: 'smaller', md: "md" }}
                  fontWeight={700} variant={'link'}
                  href={'#'}
                  borderBottom={'1px solid'}
                  rounded={'0'}>
                  CADASTRAR-SE
                </Button>
                <Button
                  onClick={() => router.push('/signin')}
                  as={'a'}
                  fontSize={'md'}
                  fontWeight={700}
                  color={'#4C4C4C'}
                  bg={'#CCD500'}
                  href={'#'}
                  borderRadius={"10px"}
                  _hover={{
                    bg: '#CCD500',
                  }}>
                  ENTRAR
                </Button>
              </>
            )
          }
        </Stack>
      </Flex>
    </Box>
  )
}
