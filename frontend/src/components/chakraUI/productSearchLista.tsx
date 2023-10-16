'use client'

import { useState } from 'react';
import { Box, Flex, Select, Input, Button, FormControl } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { ISearchPrams } from '@/interface/product';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { getAllProducts } from '@/redux/features/produtcs/productsActions';
import { useRouter } from 'next/navigation';

export default function ProductSearchList() {
  const [searchType, setSearchType] = useState('name');
  const dispatch = useDispatch<AppDispatch>()
  const route = useRouter()

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values: any) => {
    console.log(values);
    const searchData = values as ISearchPrams
    const priceSearch = searchData.priceComparisonType ? `&priceComparisonType=${searchData.priceComparisonType}` : ""
    const query = `?${searchData.searchType}=${searchData.search}${priceSearch}`
    dispatch(getAllProducts(query));
    route.push(`/plp${query}`)
  }

  return (
    <Box
      p={4}
      mb={4}
      mt={10}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg="white"
      overflow="hidden"
      maxW="1200px"
      w="80%"
      mx="auto"
      minW={'300px'}
    >
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: 'column', md: 'row' }}
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex
          direction={'row'}
          align={{ base: 'start', md: 'center' }}
          mb={{ base: 2, md: 0 }}
        >
          <Controller
            name="searchType"
            control={control}
            defaultValue="name"
            render={({ field }) => (
              <Select
                {...field}
                mb={{ base: 2, md: 0 }}
                mr={{ base: 0, md: 2 }}
                flex={field.value === 'priceValue' ? '1' : 'unset'}
                onChange={(e) => {
                  field.onChange(e);
                  setSearchType(e.target.value)
                }}
              >
                <option value="name">Nome</option>
                <option value="description">Descrição</option>
                <option value="priceValue">Preço</option>
              </Select>
            )}
          />
          {searchType === 'priceValue' && (
            <Controller
              name="priceComparisonType"
              control={control}
              defaultValue="lower"
              render={({ field }) => (
                <Select
                  {...field}
                  mb={{ base: 2, md: 0 }}
                  flex="1"
                >
                  <option value="lower">Max</option>
                  <option value="greater">Min</option>
                </Select>
              )}
            />
          )}
        </Flex>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'initial' }}
          width={searchType === 'priceValue' ? '70%' : '80%'}
        >
          <FormControl id='search'>
            <Input
              type={searchType === 'priceValue' ? 'number' : 'text'}
              placeholder="Buscar..."
              mb={{ base: 2, md: 0 }}
              flex="1"
              minW="0"
              {...register('search')}
            />
          </FormControl>
          <Button type='submit' colorScheme="teal" ml={{ base: 0, md: 2 }}>
            Buscar
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}