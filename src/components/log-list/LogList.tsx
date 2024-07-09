import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import RNFS from 'react-native-fs'

import { LOG_DIRECTORY_PATH } from '@constants'
import { ILogFileData } from '@types'
import { deleteFiles } from '@utils'

import LogCard from '../log-card/LogCard'

import { styles } from './logList-styles'

const LogList = () => {
  const [logFileData, setLogFileData] = useState<ILogFileData[]>([])

  const getLogFileData = async () => {
    try {
      const newLogFileData: ILogFileData[] = []
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

  useEffect(() => {
    getLogFileData()
  }, [])

  const handleFileDelete = (filePath: string) => async () => {
    try {
      const { deletedFiles, success } = await deleteFiles(filePath)
      if (success) {
        const newLogFileData = logFileData.filter(data => !deletedFiles?.includes(data.filePath))
        setLogFileData(newLogFileData)
      }
    } catch (error) {
      FileLogger.error(`Error in deleting files : ${JSON.stringify(error)}`)
    }
  }
  return (
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
  )
}

export default LogList
