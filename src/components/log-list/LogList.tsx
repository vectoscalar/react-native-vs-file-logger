import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import RNFS from 'react-native-fs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Spacing } from '@theme'

import { LOG_DIRECTORY_PATH } from '../../constants'
import { ILogFileData } from '../../types'
import { configureFileLogger, deleteFiles, shareFiles } from '../../utils'
import Loader from '../loader/Loader'
import LogCard from '../log-card/LogCard'

import { styles } from './logList-styles'

const LogList = () => {
  const [logFileData, setLogFileData] = useState<ILogFileData[]>([])
  const [areLogsFetched, setAreLogsFetched] = useState(true)
  const [isConfigured, setIsConfigured] = useState(true)
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>([])

  const getLogFileData = async () => {
    try {
      setAreLogsFetched(false)
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
      setAreLogsFetched(true)
    } catch (error) {
      FileLogger.error(`Error in fetching log file data: ${JSON.stringify(error)}`)
    } finally {
      setAreLogsFetched(true)
    }
  }

  const handleFileDelete = (filePaths: string[]) => async () => {
    try {
      const { deletedFiles, success } = await deleteFiles(filePaths)
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

  const handleSelectMode = () => {
    setIsSelectMode(mode => !mode)
    setSelectedFilePaths([])
  }

  useEffect(() => {
    getLogFileData()
  }, [isConfigured])

  return !isConfigured || !areLogsFetched ? (
    <Loader message={isConfigured ? 'Fetching Logs...' : 'Configuring Logger...'} />
  ) : (
    <View style={styles.container}>
      {logFileData.length > 0 && (
        <Text style={styles.directoryPath}> Log Directory Path : {LOG_DIRECTORY_PATH}</Text>
      )}
      <View style={styles.subContainer}>
        {selectedFilePaths.length > 0 && (
          <>
            <TouchableOpacity onPress={handleFileDelete(selectedFilePaths)}>
              <Icon name="delete" size={Spacing.space_24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareFiles(selectedFilePaths)}>
              <Icon name="share" size={Spacing.space_24} />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={handleSelectMode}>
          <Icon name={isSelectMode ? 'close' : 'mode-edit'} size={Spacing.space_24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={logFileData}
        keyExtractor={logData => logData.fileName}
        renderItem={({ item }) => (
          <LogCard
            {...item}
            handleFileDelete={handleFileDelete}
            isSelectMode={isSelectMode}
            selectedFilePaths={selectedFilePaths}
            setSelectedFilePaths={setSelectedFilePaths}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default LogList
