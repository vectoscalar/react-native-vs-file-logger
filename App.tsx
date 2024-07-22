import React from 'react'
import { SafeAreaView } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import { styles } from './app-styles'
import { ConfigProvider } from './src/context/ConfigContext'
import { useConfigure } from './src/hooks'
import { StackNavigator } from './src/navigator'

const App = () => {
  const options = {}

  const isConfigured = useConfigure(options)

  return (
    <ConfigProvider options={options}>
      <SafeAreaView style={styles.container}>
        {isConfigured && (
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        )}
      </SafeAreaView>
    </ConfigProvider>
  )
}

export default App
