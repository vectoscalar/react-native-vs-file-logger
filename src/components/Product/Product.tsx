import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'

const Product = () => {
  FileLogger.warn('Sample warning')
  FileLogger.debug('Sample debug log')

  const fetchProductData = () => {
    fetch('https://dummyjson.com/products/1')
      .then(res => {
        FileLogger.info('API call pending...')
        return res.json()
      })
      .then(data => FileLogger.info(`API call successfull\nProduct Data : ${JSON.stringify(data)}`))
      .catch(error => FileLogger.error(`API call error : ${error}`))
  }

  useEffect(() => {
    FileLogger.info('Product Component mounted')
    fetchProductData()
    return () => FileLogger.info('Product Component unmounted')
  }, [])

  return (
    <View>
      <Text>Products</Text>
    </View>
  )
}

export default Product
