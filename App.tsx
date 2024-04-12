import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { FileLogger } from 'react-native-file-logger'

import { Product } from '@components'

import { configureFileLogger } from './fileLogger'

const App = () => {
  useEffect(() => {
    configureFileLogger().catch(error => FileLogger.error(`FileLogger configure Error : ${error}`))
  }, [])

  return (
    <SafeAreaView>
      <Product />
    </SafeAreaView>
  )
}

export default App
