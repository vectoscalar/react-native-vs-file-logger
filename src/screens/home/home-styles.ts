import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Spacing } from '@theme'

interface IStyles {
  container: ViewStyle
  subContainer: ViewStyle
  button: ViewStyle
  label: TextStyle
  text: TextStyle
  directoryPath: TextStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    flex: Spacing.space_1,
    padding: Spacing.space_16,
  },
  subContainer: {
    flex: Spacing.space_1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'plum',
    borderRadius: Spacing.space_4,
    marginVertical: Spacing.space_16,
    paddingHorizontal: Spacing.space_8,
    paddingVertical: Spacing.space_16,
  },
  label: {
    fontSize: Spacing.space_16,
    textAlign: 'center',
  },
  text: {
    marginBottom: Spacing.space_8,
    textAlign: 'center',
  },
  directoryPath: {
    marginBottom: Spacing.space_16,
  },
})
