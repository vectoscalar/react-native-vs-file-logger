import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { FileLogger } from 'react-native-file-logger'

import { IProductType } from 'src/types/product-types'

import { API_END_POINT } from '@constants'

const Product = () => {
  FileLogger.warn('Sample warning')
  FileLogger.debug('Sample debug log')

  const fetchProductData = async () => {
    try {
      FileLogger.info('API call pending...')
      const res = await fetch(API_END_POINT)
      const data = (await res.json()) as IProductType
      FileLogger.info(`API call successfull\nProduct Data : ${JSON.stringify(data)}`)
    } catch (error) {
      FileLogger.error(`API call error : ${JSON.stringify(error)}`)
    }
  }
  useEffect(() => {
    fetchProductData().catch(error => FileLogger.error(`Error in fetching Product Data: ${error}`))
  }, [])

  return <Text>Products</Text>
}

export default Product
