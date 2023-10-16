'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: (props: any) => ({
    'html, body': {
      bg: '#eaedf0',
    },
    'ul, margin': {
      margin: 'none'
    },
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
}

export const theme = extendTheme({ styles })

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme} resetCSS>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}