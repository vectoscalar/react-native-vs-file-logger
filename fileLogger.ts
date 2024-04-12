import { FileLogger } from 'react-native-file-logger'

import { LOG_DIRECTORY_PATH, LOG_FILE_MAX_SIZE, MAX_LOG_FILES } from '@constants'

export const configureFileLogger = async () => {
  try {
    await FileLogger.configure({
      logsDirectory: LOG_DIRECTORY_PATH,
      maximumFileSize: LOG_FILE_MAX_SIZE,
      maximumNumberOfFiles: MAX_LOG_FILES,
    })

    FileLogger.info(`FileLogger configured successfully`)
  } catch (error) {
    console.error(`FileLogger configure Error : ${JSON.stringify(error)}`)
  }
}
