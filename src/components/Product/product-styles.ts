import { StyleSheet } from 'react-native'

import { Spacing } from '@theme'

export const styles = StyleSheet.create({
  container: {
    flex: Spacing.space_1,
    padding: Spacing.space_16,
  },
  subContainer: {
    flex: Spacing.space_1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'plum',
    paddingHorizontal: Spacing.space_8,
    paddingVertical: Spacing.space_16,
    borderRadius: Spacing.space_4,
    marginVertical: Spacing.space_16,
  },
  label: {
    textAlign: 'center',
    fontSize: Spacing.space_16,
  },
  text: {
    textAlign: 'center',
    marginBottom: Spacing.space_8,
  },
  listContainer: {
    marginTop: Spacing.space_8,
  },
})
