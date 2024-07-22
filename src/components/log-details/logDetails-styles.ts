import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { AppColors, Spacing } from '../../theme'

interface IStyles {
  container: ViewStyle
  header: ViewStyle
  fileName: TextStyle
  subContainer: ViewStyle
}

export const styles: IStyles = StyleSheet.create({
  container: {
    flex: Spacing.space_1,
  },

  header: {
    alignItems: 'center',
    borderBottomColor: AppColors.dark[50],
    borderBottomWidth: Spacing.space_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.space_16,
    paddingHorizontal: Spacing.space_8,
  },

  fileName: {
    textAlign: 'center',
    width: '60%',
  },

  subContainer: {
    flex: Spacing.space_1,
    paddingVertical: Spacing.space_16,
  },
})
