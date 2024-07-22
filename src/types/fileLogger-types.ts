import { LogLevel } from 'react-native-file-logger'

export interface ILogFileData {
  fileName: string
  filePath: string
  fileData: string
  lastModifiedTime: string
}

export interface IConfigureOptions {
  captureConsole?: boolean
  dailyRolling?: boolean
  formatter?: (level: LogLevel, msg: string) => string
  logLevel?: LogLevel
  logsDirectory?: string
  maximumFileSize?: number
  maximumNumberOfFiles?: number
}
