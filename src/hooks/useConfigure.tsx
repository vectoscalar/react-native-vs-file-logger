import { useEffect, useState } from 'react'
import { FileLogger } from 'react-native-file-logger'

import { configureFileLogger } from '../utils'

const useConfigure = () => {
  const [isConfigured, setIsConfigured] = useState(false)

  const configureLogger = async () => {
    try {
      await configureFileLogger()
      setIsConfigured(true)
    } catch (error) {
      console.error(`FileLogger configure error : ${error}`)
    }
  }

  useEffect(() => {
    configureLogger().catch(error => FileLogger.error(`FileLogger configure error ${error}`))
  }, [])

  return isConfigured
}

export default useConfigure
