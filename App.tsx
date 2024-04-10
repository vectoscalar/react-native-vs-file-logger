import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { FileLogger } from 'react-native-file-logger'

import { Product } from '@components'
import { logDirectoryPath } from '@constants'

const configureFileLogger = () => {
  FileLogger.configure({
    logsDirectory: logDirectoryPath,
    maximumFileSize: 5 * 1024 * 1024,
    maximumNumberOfFiles: 10,
  })
    .then(() => FileLogger.info('FileLogger configured successfully'))
    .catch(error => console.error(`FileLogger configure Error : ${error}`))
}
const App = () => {
  useEffect(() => {
    configureFileLogger()
  }, [])
  return (
    <SafeAreaView>
      <Product />
    </SafeAreaView>
  )
}

export default App
