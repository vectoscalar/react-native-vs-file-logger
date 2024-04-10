import { Platform } from 'react-native'
import RNFS from 'react-native-fs'

export const logDirectoryPath: string =
  Platform.OS === 'android'
    ? `${RNFS.ExternalDirectoryPath}/logs`
    : `${RNFS.DocumentDirectoryPath}/logs`
