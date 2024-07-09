import { StyleSheet, TextStyle } from 'react-native'

import { Spacing } from '@theme'

interface IStyles {
  directoryPath: TextStyle
}

export const styles: IStyles = StyleSheet.create({
  directoryPath: {
    marginVertical: Spacing.space_16,
  },
})
