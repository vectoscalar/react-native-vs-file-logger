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
  /** fileData: is a required prop which states the data for log file. */
  fileData: string
  /** fileName: is a required prop which states the name for log file. */
  fileName: string
  /** fileName: is a required prop which states the path for log file. */
  filePath: string
  /** handleFileDelete: is a required prop which states function to handle the deletion log files. */
  handleFileDelete: (filePath: string) => () => void
}

const LogCard = (props: ILogCardProps) => {
  const { fileData, fileName, filePath, handleFileDelete } = props
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>()

  const handleFileShare = () => {
    shareFiles(filePath).catch(error => {
      FileLogger.error(`Error in sharing file : ${error}`)
    })
  }

  const handleNavigation = () => {
    navigation.navigate(Screens.LogDetails, {
      fileName,
      fileData,
      filePath,
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigation}>
        <Text>{fileName}</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFileDelete(filePath)}>
          <Icon name="delete" size={Spacing.space_24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFileShare}>
          <Icon name="share" size={Spacing.space_24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogCard
