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
    flexWrap: 'wrap',
    marginTop: Spacing.space_8,
    paddingVertical: Spacing.space_12,
  },

  leftSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.space_8,
    width: '60%',
  },

  rightSubContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: Spacing.space_24,
    width: '40%',
  },
})