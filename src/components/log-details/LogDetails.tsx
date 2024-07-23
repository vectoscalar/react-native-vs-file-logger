import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Spacing } from '../../theme'
import { shareFiles } from '../../utils'

import { styles } from './logDetails-styles'

interface ILogDetailsProps {
  /** fileData is a required prop which states the data of log file. */
  fileData: string
  /** fileName is a required prop which states the name of log file. */
  fileName: string
  /** filePath is a required prop which states the path of log file. */
  filePath: string
  /** setLogDataIndex is a required function prop which sets the log data index. */
  setLogDataIndex: React.Dispatch<React.SetStateAction<number>>
}

const LogDetails = (props: ILogDetailsProps) => {
  const { fileName, fileData, filePath, setLogDataIndex } = props

  const handleBackButtonPress = () => {
    setLogDataIndex(-1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Icon name="arrow-back" size={Spacing.space_20} />
        </TouchableOpacity>
        <Text style={styles.fileName}>{fileName}</Text>
        <TouchableOpacity onPress={shareFiles([filePath])}>
          <Icon name="share" size={Spacing.space_20} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
        <Text>{fileData}</Text>
      </ScrollView>
    </View>
  )
}

export default LogDetails
