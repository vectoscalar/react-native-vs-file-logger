import { StyleSheet } from 'react-native'

import { AppColors, Spacing } from '@theme'

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: AppColors.light,
    justifyContent: 'center',
    zIndex: Spacing.space_1000,
  },
  loader: {
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
