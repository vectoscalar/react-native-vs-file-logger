import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import RNFS from 'react-native-fs'

import { LogCard } from '@components'
import { API_END_POINT, LOG_DIRECTORY_PATH } from '@constants'
import { ILogFileDataType, IProductDataType } from '@types'
import { deleteFiles } from '@utils'

import { styles } from './home-styles'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState<IProductDataType[]>([])
  const intervalId = useRef<NodeJS.Timeout>()
  const [logFileData, setLogFileData] = useState<ILogFileDataType[]>([])

  FileLogger.warn('Sample warning')
  FileLogger.debug('Sample debug log')

  const getProductData = async () => {
    try {
      FileLogger.info('API call pending...')
      const res = await fetch(API_END_POINT)
      const data = (await res.json()) as { products: IProductDataType[] }
      FileLogger.info(`API call successfull\nProduct Data : ${JSON.stringify(data)}`)
      if (data && data.products) setProductData(prevData => [...prevData, ...data.products])
    } catch (error) {
      FileLogger.error(`API call error : ${JSON.stringify(error)}`)
    }
  }

  const getLogFileData = async () => {
    try {
      const newLogFileData: ILogFileDataType[] = []
      const files = await RNFS.readDir(LOG_DIRECTORY_PATH)

      await Promise.all(
        files.map(async file => {
          const data = await RNFS.readFile(file.path)
          const logData = {
            fileName: file.name,
            filePath: file.path,
            fileData: data,
          }
          newLogFileData.push(logData)
        }),
      )

      setLogFileData(newLogFileData)
    } catch (error) {
      FileLogger.error(`Error in fetching log file data ${JSON.stringify(error)}`)
    }
  }

  const fetchProductData = () => {
    setLoading(true)

    intervalId.current = setInterval(() => {
      getProductData().catch(error => FileLogger.error(`Error in fetching Product Data: ${error}`))
    }, 500)

    setTimeout(() => {
      clearInterval(intervalId.current)
      getLogFileData().catch(error => FileLogger.error(`Error in getting log file data : ${error}`))
      setLoading(false)
    }, 10000)
  }

  const deleteFileHandler = async (filePath: string) => {
    try {
      const { success, deletedFiles } = await deleteFiles(filePath)
      if (success) {
        const newLogFileData = logFileData.filter(data => !deletedFiles?.includes(data.filePath))
        setLogFileData(newLogFileData)
      }
    } catch (error) {
      FileLogger.error(`Error in deleting files : ${JSON.stringify(error)}`)
    }
  }

  const renderProductList = () => {
    return loading ? (
      <>
        <Text style={styles.text}>Fetching Products Data ....</Text>
        <ActivityIndicator size="large" />
      </>
    ) : (
      <>
        {productData.length > 0 && (
          <Text style={styles.directoryPath}> Log Directory Path : {LOG_DIRECTORY_PATH}</Text>
        )}

        <FlatList
          data={logFileData}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          renderItem={({ item }) => <LogCard {...item} deleteFileHandler={deleteFileHandler} />}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
        />
      </>
    )
  }

  useEffect(() => {
    getLogFileData().catch(error => FileLogger.error(`Error in getting log file data :  ${error}`))
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={fetchProductData} style={styles.button} disabled={loading}>
        <Text style={styles.label}>Fetch Products Data</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>{renderProductList()}</View>
    </View>
  )
}

export default Home
