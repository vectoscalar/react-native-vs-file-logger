import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Spacing } from '../../theme'
import { ILogFileData, StackNavigatorParamList } from '../../types'
import { shareFiles } from '../../utils'

import { styles } from './logDetails-styles'

const LogDetails = () => {
  const route = useRoute<RouteProp<{ params: ILogFileData }, 'params'>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>()
  const { fileName, fileData, filePath } = route.params

  const handleNavigation = () => {
    navigation.goBack()
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigation}>
          <Icon name="arrow-back" size={Spacing.space_20} />
        </TouchableOpacity>
        <Text>{fileName}</Text>
        <TouchableOpacity onPress={void shareFiles([filePath])}>
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
