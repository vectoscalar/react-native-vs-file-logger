import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Screens } from '@constants'
import { Spacing } from '@theme'
import { StackNavigatorParamList } from '@types'
import { shareFiles } from '@utils'

import { styles } from './logCard-styles'

interface ILogCardProps {
  fileName: string
  filePath: string
  fileData: string
  deleteFileHandler: (filePath: string) => void
}

const LogCard = (props: ILogCardProps) => {
  const { fileName, filePath, fileData, deleteFileHandler } = props
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>()

  const fileShareHandler = () => {
    shareFiles(filePath).catch(error => {
      FileLogger.error(`Error in sharing file : ${error}`)
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Screens.LogDetails, {
            fileName,
            fileData,
            filePath,
          })
        }>
        <Text>{fileName}</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={() => deleteFileHandler(filePath)}>
          <Icon name="delete" size={Spacing.space_20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fileShareHandler}>
          <Icon name="share" size={Spacing.space_20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogCard
