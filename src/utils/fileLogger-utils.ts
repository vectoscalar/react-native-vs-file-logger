import { FileLogger } from 'react-native-file-logger'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'

import { LOG_DIRECTORY_PATH, LOG_FILE_MAX_SIZE, MAX_LOG_FILES } from '../constants'

export const shareFiles = (filePaths: string[]) => async () => {
  try {
    const fileExistencePromises = filePaths.map(filePath => RNFS.exists(filePath))

    const fileExistenceResults = await Promise.all(fileExistencePromises)

    if (fileExistenceResults.some(exists => !exists)) {
      FileLogger.error('one or more files not found')
      return
    }

    const shareOptions = {
      email: 'dummy@gmail.com',
      failOnCancel: false,
      message: 'Sample message',
      subject: 'Sample subject',
      urls: filePaths.map(filePath => `file://${filePath}`),
    }

    await Share.open(shareOptions)
  } catch (error) {
    FileLogger.error(`Log file sharing failed : ${JSON.stringify(error)}`)
  }
}

export const deleteFiles = async (filePaths: string[]) => {
  try {
    const deletePromises = filePaths.map(async filePath => {
      const fileExists = await RNFS.exists(filePath)
      if (fileExists) {
        await RNFS.unlink(filePath)
        FileLogger.info(`File with path : ${filePath} deleted successfully`)
        return filePath
      }
      FileLogger.error(`File with path : ${filePath} does not exist`)
      return null
    })
    const deletedFiles = await Promise.all(deletePromises)
    return {
      success: true,
      deletedFiles,
    }
  } catch (error) {
    FileLogger.error(`Error deleting files: ${JSON.stringify(error)}`)
    return {
      success: false,
    }
  }
}

export const configureFileLogger = async () => {
  try {
    await FileLogger.configure({
      logsDirectory: LOG_DIRECTORY_PATH,
      maximumFileSize: LOG_FILE_MAX_SIZE,
      maximumNumberOfFiles: MAX_LOG_FILES,
    })
    FileLogger.info(`FileLogger configured successfully`)
  } catch (error) {
    console.error(`FileLogger configure error : ${JSON.stringify(error)}`)
  }
}
