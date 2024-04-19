import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { FileLogger } from 'react-native-file-logger'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Spacing } from '@theme'
import { ILogFileDataType, StackNavigatorParamList } from '@types'
import { shareFiles } from '@utils'

import { styles } from './logDetails-styles'

const LogDetails = () => {
  const route = useRoute<RouteProp<{ params: ILogFileDataType }, 'params'>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>()
  const { fileName, fileData, filePath } = route.params

  const fileShareHandler = () => {
    shareFiles(filePath).catch(error => {
      FileLogger.error(`Error in sharing file : ${error}`)
    })
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={Spacing.space_20} />
        </TouchableOpacity>
        <Text>{fileName}</Text>
        <TouchableOpacity onPress={fileShareHandler}>
          <Icon name="share" size={Spacing.space_20} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.subContainer}>
        <Text>{fileData}</Text>
      </ScrollView>
    </>
  )
}

export default LogDetails
