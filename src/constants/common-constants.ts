import { Platform } from 'react-native'
import RNFS from 'react-native-fs'

export const LOG_DIRECTORY_PATH: string =
  Platform.OS === 'android'
    ? `${RNFS.ExternalDirectoryPath}/logs`
    : `${RNFS.DocumentDirectoryPath}/logs`

export const LOG_FILE_MAX_SIZE: number = 5 * 1024 * 1024

export const MAX_LOG_FILES: number = 10

export const API_END_POINT = 'https://dummyjson.com/products/1'
