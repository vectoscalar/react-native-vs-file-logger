import React from 'react'
import { SafeAreaView } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import { styles } from './app-styles'
import { Loader } from './src/components'
import { useConfigure } from './src/hooks'
import { StackNavigator } from './src/navigator'

const App = () => {
  const isConfigured = useConfigure()
  return (
    <SafeAreaView style={styles.container}>
      {isConfigured ? (
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      ) : (
        <Loader message="Configuring Logger..." />
      )}
    </SafeAreaView>
  )
}

export default App
