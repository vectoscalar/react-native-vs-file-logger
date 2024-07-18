import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '../../theme'

interface IStyles {
  container: ViewStyle
  subContainer: ViewStyle
  text: TextStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: AppColors.light,
    justifyContent: 'center',
    zIndex: Spacing.space_1000,
  },
  subContainer: {
    alignItems: 'center',
    borderRadius: Spacing.space_10,
    justifyContent: 'center',
  },
  text: {
    color: AppColors.dark['600'],
    fontSize: Spacing.space_16,
    marginTop: Spacing.space_8,
    textAlign: 'center',
  },
})
