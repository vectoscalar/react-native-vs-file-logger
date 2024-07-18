import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { styles } from './loader-styles'

interface ILoaderProps {
  /** message is an optional prop which states the message to be displayed while loader is visible. */
  message?: string
}
const Loader = (props: ILoaderProps) => {
  const { message = 'Loading...' } = props

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  )
}

export default Loader
