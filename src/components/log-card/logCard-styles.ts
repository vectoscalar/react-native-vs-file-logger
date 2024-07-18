import { StyleSheet, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '../../theme'

interface IStyles {
  container: ViewStyle
  leftSubContainer: ViewStyle
  rightSubContainer: ViewStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: AppColors.dark['50'],
    borderBottomWidth: Spacing.space_1,
    flexDirection: 'row',
    marginTop: Spacing.space_8,
    paddingVertical: Spacing.space_12,
  },
  leftSubContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: Spacing.space_8,
  },
  rightSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.space_24,
  },
})
