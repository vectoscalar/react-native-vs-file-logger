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
    borderBottomWidth: Spacing.space_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.space_8,
    padding: Spacing.space_8,
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: AppColors.primary['100'],
    borderRadius: Spacing.space_4,
    marginHorizontal: Spacing.space_8,
    padding: Spacing.space_8,
  },
  label: {
    color: AppColors.light,
  },
})
