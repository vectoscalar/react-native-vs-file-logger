import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'

import { IProductType } from 'src/types/product-types'

import { ProductCard } from '@components'
import { API_CALL_LIMIT, API_END_POINT, LOG_DIRECTORY_PATH } from '@constants'

import { styles } from './product-styles'

const Product = () => {
  const [callCount, setCallCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState<IProductType[]>([])
  const intervalId = useRef<NodeJS.Timeout>()

  FileLogger.warn('Sample warning')
  FileLogger.debug('Sample debug log')

  const getProductData = async () => {
    try {
      FileLogger.info('API call pending...')
      const res = await fetch(API_END_POINT)
      const data = (await res.json()) as { products: IProductType[] }
      FileLogger.info(`API call successfull\nProduct Data : ${JSON.stringify(data)}`)
      setProductData(prevData =>
        prevData.length === 0 ? [...prevData, ...data.products] : prevData,
      )
      setCallCount(count => count + 1)
    } catch (error) {
      FileLogger.error(`API call error : ${JSON.stringify(error)}`)
    }
  }

  useEffect(() => {
    if (callCount > API_CALL_LIMIT) {
      setLoading(false)
      setCallCount(0)
      clearInterval(intervalId.current)
    }
  }, [callCount])

  const fetchProductData = () => {
    setLoading(true)
    intervalId.current = setInterval(() => {
      getProductData().catch(error => FileLogger.error(`Error in fetching Product Data: ${error}`))
    }, 0)
  }

  const renderProductList = () => {
    return loading ? (
      <>
        <Text style={styles.text}>Fetching Products Data ....</Text>
        <ActivityIndicator size="large" />
      </>
    ) : (
      <>
        {productData.length > 0 && <Text> Log Directory Path : {LOG_DIRECTORY_PATH}</Text>}
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={productData}
          renderItem={({ item }) => <ProductCard {...item} />}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
        />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={fetchProductData} style={styles.button}>
        <Text style={styles.label}>Fetch Product Data</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>{renderProductList()}</View>
    </View>
  )
}

export default Product
