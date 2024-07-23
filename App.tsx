import React from 'react'
import { SafeAreaView } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import { styles } from './app-styles'
import { ConfigProvider } from './src/context'
import { StackNavigator } from './src/navigator'

const App = () => {
  const options = {
    maximumNumberOfFiles: 3,
    maximumFileSize: 1024 * 1024,
    captureConsole: true,
  }

  return (
    <ConfigProvider options={options}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </ConfigProvider>
  )
}

export default App
