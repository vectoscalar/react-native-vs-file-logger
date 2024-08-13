import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Spacing } from '../../theme'
import { shareFiles } from '../../utils'

import { styles } from './logCard-styles'

interface ILogCardProps {
  /** fileName is a required prop which states the name for log file. */
  fileName: string
  /** fileName is a required prop which states the path for log file. */
  filePath: string
  /** handleFileDelete is a required prop which is a function to handle the deletion log files. */
  handleFileDelete: (filePath: string[]) => () => void
  /** index is a required prop which states the index of log data. */
  index: number
  /** isSelectMode is an optional prop which states whether select mode is on or not. */
  isSelectMode?: boolean
  /** setLogDataIndex is a required function prop which sets the log data index. */
  setLogDataIndex: React.Dispatch<React.SetStateAction<number>>
}

const LogCard = (props: ILogCardProps) => {
  const {
    fileName,
    filePath,
    handleFileDelete,
    index,
    isSelectMode = false,
    setLogDataIndex,
  } = props

  const handleLogCardPress = () => {
    setLogDataIndex(index)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftSubContainer} onPress={handleLogCardPress}>
        <Text>{fileName}</Text>
      </TouchableOpacity>
      <View style={styles.rightSubContainer}>
        <TouchableOpacity onPress={handleFileDelete([filePath])} disabled={isSelectMode}>
          <Icon name="delete" size={Spacing.space_24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareFiles([filePath])} disabled={isSelectMode}>
          <Icon name="share" size={Spacing.space_24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogCard
