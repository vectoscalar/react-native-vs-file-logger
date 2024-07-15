import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import RNFS from 'react-native-fs'

import { LOG_DIRECTORY_PATH } from '@constants'
import { ILogFileData } from '@types'
import { configureFileLogger, deleteFiles } from '@utils'

import Loader from '../loader/Loader'
import LogCard from '../log-card/LogCard'

import { styles } from './logList-styles'

const LogList = () => {
  const [logFileData, setLogFileData] = useState<ILogFileData[]>([])
  const [isLogsFetched, setIsLogsFetched] = useState(true)
  const [isConfigured, setIsConfigured] = useState(true)
  const getLogFileData = async () => {
    try {
      setIsLogsFetched(false)
      const files = await RNFS.readDir(LOG_DIRECTORY_PATH)
      const fileDataPromises = files.map(async file => {
        const data = await RNFS.readFile(file.path)
        return {
          fileData: data,
          fileName: file.name,
          filePath: file.path,
        }
      })
      const newLogFileData = await Promise.all(fileDataPromises)
      setLogFileData(newLogFileData)
      setIsLogsFetched(true)
    } catch (error) {
      FileLogger.error(`Error in fetching log file data: ${JSON.stringify(error)}`)
    } finally {
      setIsLogsFetched(true)
    }
  }
  useEffect(() => {
    getLogFileData()
  }, [isConfigured])
  const handleFileDelete = (filePath: string) => async () => {
    try {
      const { deletedFiles, success } = await deleteFiles(filePath)
      if (success) {
        const newLogFileData = logFileData.filter(data => !deletedFiles?.includes(data.filePath))
        if (newLogFileData.length === 0) {
          setIsConfigured(false)
          await configureFileLogger()
          const files = await RNFS.readDir(LOG_DIRECTORY_PATH)
          if (files.length === 0) await configureFileLogger()
          setTimeout(() => {
            setIsConfigured(true)
          }, 2000)
        }
        setLogFileData(newLogFileData)
      }
    } catch (error) {
      FileLogger.error(`Error in deleting files : ${JSON.stringify(error)}`)
    }
  }
  return (
    <>
      {!isConfigured || !isLogsFetched ? (
        <Loader message={isConfigured ? 'Fetching Logs...' : 'Configuring Logger...'} />
      ) : (
        <View>
          {logFileData.length > 0 && (
            <Text style={styles.directoryPath}> Log Directory Path : {LOG_DIRECTORY_PATH}</Text>
          )}
          <FlatList
            data={logFileData}
            keyExtractor={logData => logData.fileName}
            renderItem={({ item }) => <LogCard {...item} handleFileDelete={handleFileDelete} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  )
}
export default LogList
