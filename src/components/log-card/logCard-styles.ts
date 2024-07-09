import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '@theme'

interface IStyles {
  container: ViewStyle
  subContainer: ViewStyle
  button: ViewStyle
  label: TextStyle
}
export const styles: IStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: AppColors.dark['50'],
    borderBottomWidth: Spacing.space_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.space_8,
    paddingVertical: Spacing.space_12,
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: Spacing.space_12,
  },

  label: {
    color: AppColors.light,
  },
})
