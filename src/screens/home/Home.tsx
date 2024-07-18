import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'

import { Loader, LogList } from '../../components'
import { API_END_POINT } from '../../constants'
import { IProductData } from '../../types'

import { styles } from './home-styles'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState<IProductData[]>([])

  FileLogger.warn('Sample warning log')
  FileLogger.debug('Sample debug log')
  console.log('sample console log')

  const getProductData = async () => {
    try {
      FileLogger.info('API call pending...')
      const res = await fetch(API_END_POINT)
      const data = (await res.json()) as { products: IProductData[] }
      FileLogger.info(`API call successfull\nProduct Data : ${JSON.stringify(data)}`)
      if (data && data.products) setProductData(prevData => [...prevData, ...data.products])
    } catch (error) {
      FileLogger.error(`API call error : ${JSON.stringify(error)}`)
    }
  }

  const fetchProductData = () => {
    setLoading(true)
    const intervalId = setInterval(() => {
      getProductData().catch(error => FileLogger.error(`Error in fetching Product Data: ${error}`))
    }, 1000)

    setTimeout(() => {
      clearInterval(intervalId)
      setLoading(false)
    }, 10000)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader message="Fetching data..." />
      ) : (
        <>
          <TouchableOpacity onPress={fetchProductData} style={styles.button} disabled={loading}>
            <Text style={styles.label}>Fetch Products Data</Text>
          </TouchableOpacity>
          <LogList />
        </>
      )}
    </View>
  )
}

export default Home
