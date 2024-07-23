import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '../../theme'

interface IStyles {
  button: ViewStyle
  container: ViewStyle
  label: TextStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    flex: Spacing.space_1,
    padding: Spacing.space_8,
  },
  button: {
    backgroundColor: AppColors.dark[100],
    borderRadius: Spacing.space_4,
    marginVertical: Spacing.space_16,
    paddingHorizontal: Spacing.space_8,
    paddingVertical: Spacing.space_16,
  },
  label: {
    fontSize: Spacing.space_16,
    textAlign: 'center',
    color: AppColors.light,
  },
})
