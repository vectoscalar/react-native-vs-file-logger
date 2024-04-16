import { StyleSheet, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '@theme'

interface IStyles {
  container: ViewStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    borderBottomColor: AppColors.primary,
    borderBottomWidth: Spacing.space_1,
    padding: Spacing.space_8,
  },
})
