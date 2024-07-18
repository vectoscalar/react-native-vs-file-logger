import React from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Spacing } from '../../theme'

interface ICheckboxProps {
  /** isChecked is a required prop that determines whether the checkbox is checked. */
  isChecked: boolean
  /** onPress is a required prop that triggers an action when checkbox is pressed. */
  onPress: () => void
}

const Checkbox = (props: ICheckboxProps) => {
  const { isChecked, onPress } = props
  const iconName = isChecked ? 'checkbox-outline' : 'checkbox-blank-outline'

  return (
    <Pressable onPress={onPress}>
      <Icon name={iconName} size={Spacing.space_24} />
    </Pressable>
  )
}

export default Checkbox
