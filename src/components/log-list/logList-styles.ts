import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Spacing } from '../../theme'

interface IStyles {
  subContainer: ViewStyle
  container: ViewStyle
  directoryPath: TextStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.space_8,
  },

  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.space_32,
    marginVertical: Spacing.space_16,
  },

  directoryPath: {
    fontWeight: 'bold',
  },
})