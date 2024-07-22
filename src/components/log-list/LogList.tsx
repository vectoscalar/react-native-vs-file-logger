import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import RNFS from 'react-native-fs'

import { LOG_DIRECTORY_PATH } from '../../constants'
import { ConfigContext } from '../../context/ConfigContext'
import { ILogFileData } from '../../types'
import { configureFileLogger, deleteFiles, getFormattedFileName } from '../../utils'
import Loader from '../loader/Loader'
import LogCard from '../log-card/LogCard'
import LogDetails from '../log-details/LogDetails'

import { styles } from './logList-styles'

// import Icon from 'react-native-vector-icons/MaterialIcons'

const LogList = () => {
  const [logFileData, setLogFileData] = useState<ILogFileData[]>([])
  const [areLogsFetched, setAreLogsFetched] = useState(true)
  const [isConfigured, setIsConfigured] = useState(true)
  const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>([])
  const [logDataIndex, setLogDataIndex] = useState(-1)
  const configureOptions = useContext(ConfigContext)
  const [isSelectMode, setIsSelectMode] = useState(false)

  const getLogFileData = async () => {
    try {
      setAreLogsFetched(false)
      const files = await RNFS.readDir(LOG_DIRECTORY_PATH)
      const fileDataPromises = files.map(async file => {
        const { name, mtime, path } = file
        const data = await RNFS.readFile(path)
        const formattedFileName = getFormattedFileName(name, String(mtime))
        return {
          fileData: data,
          fileName: formattedFileName,
          filePath: path,
          lastModifiedTime: String(mtime),
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
          await configureFileLogger(configureOptions)
          const files = await RNFS.readDir(LOG_DIRECTORY_PATH)
          if (files.length === 0) await configureFileLogger(configureOptions)
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

  useEffect(() => {
    getLogFileData()
  }, [isConfigured])

  const renderLogList = () => {
    return logDataIndex >= 0 ? (
      <LogDetails
        fileData={logFileData[logDataIndex].fileData}
        fileName={logFileData[logDataIndex].fileName}
        filePath={logFileData[logDataIndex].filePath}
        setLogDataIndex={setLogDataIndex}
      />
    ) : (
      <View style={styles.container}>
        {logFileData.length > 0 && (
          <Text style={styles.directoryPath}> Log Directory Path : {LOG_DIRECTORY_PATH}</Text>
        )}
        {/* <View style={styles.subContainer}>
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
        </View> */}
        <FlatList
          data={logFileData}
          keyExtractor={logData => logData.fileName}
          renderItem={({ item, index }) => (
            <LogCard
              fileName={item.fileName}
              filePath={item.filePath}
              handleFileDelete={handleFileDelete}
              index={index}
              isSelectMode={isSelectMode}
              selectedFilePaths={selectedFilePaths}
              setLogDataIndex={setLogDataIndex}
              setSelectedFilePaths={setSelectedFilePaths}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  return !isConfigured || !areLogsFetched ? (
    <Loader message={isConfigured ? 'Fetching Logs...' : 'Configuring Logger...'} />
  ) : (
    renderLogList()
  )
}

export default LogList
