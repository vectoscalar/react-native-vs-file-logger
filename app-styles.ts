import { StyleSheet, ViewStyle } from 'react-native'

import { Spacing } from '@theme'

interface IStyles {
  container: ViewStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    flex: Spacing.space_1,
  },
})
