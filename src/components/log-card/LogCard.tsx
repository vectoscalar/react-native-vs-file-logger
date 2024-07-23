import React, { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Spacing } from '../../theme'
import { shareFiles } from '../../utils'
import Checkbox from '../checkbox/Checkbox'

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
  /** selectedFilePaths is a required prop which specifies the path of files which are selected. */
  // selectedFilePaths: string[]
  /** setLogDataIndex is a required function prop which sets the log data index. */
  setLogDataIndex: React.Dispatch<React.SetStateAction<number>>
  /** setSelectedFilePaths is a required prop which is function to update the list of selected file paths. */
  // setSelectedFilePaths: Dispatch<SetStateAction<string[]>>
}

const LogCard = (props: ILogCardProps) => {
  const {
    fileName,
    filePath,
    handleFileDelete,
    index,
    isSelectMode = false,
    setLogDataIndex,
    // selectedFilePaths,
    // setSelectedFilePaths,
  } = props

  // const isCheckboxChecked = selectedFilePaths.includes(filePath)

  const handleLogCardPress = () => {
    setLogDataIndex(index)
  }

  // const handleFileSelect = (selectedFilePath: string) => () => {
  //   const isFileSelected = selectedFilePaths.includes(selectedFilePath)
  //   if (isFileSelected) {
  //     setSelectedFilePaths(prev => prev.filter(path => path !== selectedFilePath))
  //   } else {
  //     setSelectedFilePaths(prev => [...prev, selectedFilePath])
  //   }
  // }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftSubContainer} onPress={handleLogCardPress}>
        {/* {isSelectMode && (
          <Checkbox isChecked={isCheckboxChecked} onPress={handleFileSelect(filePath)} />
        )} */}
        <Text>{fileName}</Text>
      </TouchableOpacity>
      {/* {!isSelectMode && ( */}
      <View style={styles.rightSubContainer}>
        <TouchableOpacity onPress={handleFileDelete([filePath])} disabled={isSelectMode}>
          <Icon name="delete" size={Spacing.space_24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareFiles([filePath])} disabled={isSelectMode}>
          <Icon name="share" size={Spacing.space_24} />
        </TouchableOpacity>
      </View>
      {/* )} */}
    </View>
  )
}

export default LogCard
