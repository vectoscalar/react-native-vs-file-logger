import React, { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Screens } from '../../constants'
import { Spacing } from '../../theme'
import { StackNavigatorParamList } from '../../types'
import { shareFiles } from '../../utils'
import Checkbox from '../checkbox/Checkbox'

import { styles } from './logCard-styles'

interface ILogCardProps {
  /** fileData is a required prop which states the data for log file. */
  fileData: string
  /** fileName is a required prop which states the name for log file. */
  fileName: string
  /** fileName is a required prop which states the path for log file. */
  filePath: string
  /** handleFileDelete is a required prop which is a function to handle the deletion log files. */
  handleFileDelete: (filePath: string[]) => () => void
  /** isSelectMode is a required prop which states whether select mode is on or not. */
  isSelectMode: boolean
  /** selectedFilePaths is a required prop which specifies the path of files which are selected. */
  selectedFilePaths: string[]
  /** setSelectedFilePaths is a required prop which is function to update the list of selected file paths. */
  setSelectedFilePaths: Dispatch<SetStateAction<string[]>>
}

const LogCard = (props: ILogCardProps) => {
  const {
    fileData,
    fileName,
    filePath,
    handleFileDelete,
    isSelectMode,
    selectedFilePaths,
    setSelectedFilePaths,
  } = props
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>()
  const isCheckboxChecked = selectedFilePaths.includes(filePath)

  const handleNavigation = () => {
    navigation.navigate(Screens.LogDetails, {
      fileName,
      fileData,
      filePath,
    })
  }

  const handleFileSelect = (selectedFilePath: string) => () => {
    const isFileSelected = selectedFilePaths.includes(selectedFilePath)
    if (isFileSelected) {
      setSelectedFilePaths(prev => prev.filter(path => path !== selectedFilePath))
    } else {
      setSelectedFilePaths(prev => [...prev, selectedFilePath])
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftSubContainer} onPress={handleNavigation}>
        {isSelectMode && (
          <Checkbox isChecked={isCheckboxChecked} onPress={handleFileSelect(filePath)} />
        )}
        <Text>{fileName}</Text>
      </TouchableOpacity>
      {!isSelectMode && (
        <View style={styles.rightSubContainer}>
          <TouchableOpacity onPress={handleFileDelete([filePath])} disabled={isSelectMode}>
            <Icon name="delete" size={Spacing.space_24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareFiles([filePath])} disabled={isSelectMode}>
            <Icon name="share" size={Spacing.space_24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default LogCard
