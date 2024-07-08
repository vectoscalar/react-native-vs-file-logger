import { Platform } from 'react-native'
import RNFS from 'react-native-fs'

export const LOG_DIRECTORY_PATH: string =
  Platform.OS === 'android'
    ? `${RNFS.ExternalDirectoryPath}/logs`
    : `${RNFS.DocumentDirectoryPath}/logs`

export const LOG_FILE_MAX_SIZE: number = 1024 * 1024 // 1MB

export const MAX_LOG_FILES: number = 3

export const API_END_POINT: string = 'https://dummyjson.com/products?limit=100'
