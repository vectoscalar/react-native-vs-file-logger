import { Platform } from 'react-native'
import { LogLevel, logLevelNames } from 'react-native-file-logger'
import RNFS from 'react-native-fs'

import { IConfigureOptions } from '../types'
import { getDateTime } from '../utils'

export const LOG_DIRECTORY_PATH =
  Platform.OS === 'android'
    ? `${RNFS.ExternalDirectoryPath}/logs`
    : `${RNFS.DocumentDirectoryPath}/logs`

export const LOG_FILE_MAX_SIZE = 1024 * 1024 // 1MB

export const MAX_LOG_FILES = 3

const defaultFormatter = (level: LogLevel, message: string) => {
  const now = new Date()
  const levelName = logLevelNames[level]
  const dateTimeString = new Date().toISOString()
  const { date, time } = getDateTime(dateTimeString)
  return `${date}--${time}--[${levelName}]:  ${message}`
}

export const DEFAULT_CONFIGURE_OPTIONS: IConfigureOptions = {
  captureConsole: true,
  dailyRolling: true,
  formatter: defaultFormatter,
  logLevel: LogLevel.Debug,
  logsDirectory: LOG_DIRECTORY_PATH,
  maximumFileSize: LOG_FILE_MAX_SIZE,
  maximumNumberOfFiles: MAX_LOG_FILES,
}
