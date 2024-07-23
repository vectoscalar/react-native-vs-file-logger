import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Screens } from '../../constants'
import { Home } from '../../screens'
import { StackNavigatorParamList } from '../../types'

const Stack = createNativeStackNavigator<StackNavigatorParamList>()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Screens.Home}>
      <Stack.Screen
        name={Screens.Home}
        component={Home}
        options={{ gestureDirection: 'horizontal' }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
