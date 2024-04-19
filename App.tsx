import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import { styles } from './app-styles'
import { configureFileLogger } from './fileLogger'
import { StackNavigator } from './src/navigator'

const App = () => {
  useEffect(() => {
    configureFileLogger().catch(error => console.error(`FileLogger configure error : ${error}`))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
