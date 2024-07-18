import { StyleSheet, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '../../theme'

interface IStyles {
  container: ViewStyle
  subContainer: ViewStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: AppColors.dark[50],
    borderBottomWidth: Spacing.space_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.space_16,
  },
  subContainer: {
    flex: Spacing.space_1,
    padding: Spacing.space_16,
  },
})
