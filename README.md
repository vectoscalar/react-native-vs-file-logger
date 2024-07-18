# react-native-vs-file-logger

## Features

- **Logs Recording:** All existing console.log/debug/... calls are automatically tracked and logged in to files.
- **View log files on UI:** View the log files along with the contents on UI.
- **Delete log files:** Log Files can be easily deleted through UI.
- **Email File sharing:** Support for sharing files through email.
- **File rolling:** Support for time and size-based file rolling. Max number of files (by default 3) and size-limit (by default 1MB) can be configured.

## Prerequisites:-

- Following npm packages should be in your project with their required setup
  1. <a href="https://www.npmjs.com/package/react-native-file-logger">react-native-file-logger</a>
  2. <a href="https://www.npmjs.com/package/react-native-fs">react-native-fs</a>
  3. <a href="https://www.npmjs.com/package/react-native-share">react-native-share</a>
  4. <a href="https://www.npmjs.com/package/@react-navigation/native"> @react-navigation/native</a>
  5. <a href="https://www.npmjs.com/package/react-native-vector-icons"> react-native-vector-icons</a>

## Installation

```jsxn
npm i react-native-vs-file-logger
```

## Usage

### Configuring logger

- Just import and call useConfigure() Hook.
- useConfigure() will return you a boolean value which states whether the logger is configured or not, while the value is false you can show a loader.

```jsx
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useConfigure } from 'react-native-vs-file-logger'

import { NavigationContainer } from '@react-navigation/native'

import { styles } from './app-styles'
import { Loader } from './src/components'
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
```

### Log capturing

- Use console API such as console.log , console.error, console.warn etc which are automatically captured and stored in log files.

- As we have installed react-native-file-logger package we can also use its API's also ,such as

  #### FileLogger.debug(msg)

  #### FileLogger.info(msg)

  #### FileLogger.warn(msg)

  #### FileLogger.error(msg)

  #### FileLogger.write(level, msg)

Read more about it here - <a href="https://www.npmjs.com/package/react-native-file-logger">react-native-file-logger</a>

### Example -

```jsx
import React, { useState } from 'react'
import { FileLogger } from 'react-native-file-logger'
import { LogList } from 'react-native-vs-file-logger'

const Home = () => {
  console.log('Sample log using console API')

  FileLogger.info('Sample log using FileLogger API')

  return <Text>List of Log Files</Text>
}

export default Home
```

### Render logs files and view its content

- Import LogDetails screen from package add to stack navigator with screen name = 'LogDetails'

```jsx
import { LogDetails } from 'react-native-vs-file-logger'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../../screens'

type StackNavigatorParamList = {
  Home: undefined
  LogDetails: {
    fileName: string
    fileData: string
    filePath: string
  }
}

const Stack = createNativeStackNavigator<StackNavigatorParamList>()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options= {{ gestureDirection: 'horizontal' }}
      />
      <Stack.Screen
        name='LogDetails'
        component={LogDetails}
        options= {{ gestureDirection: 'horizontal' }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator

```

- Just import and use LogList component anywhere in your project to render all logs on UI.

```jsx
import React, { useState } from 'react'
import { LogList } from 'react-native-vs-file-logger'

const Home = () => {
  return (
    <View>
      <Text>List of Log Files</Text>
      <LogList />
    </View>
  )
}

export default Home
```
