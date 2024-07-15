import { useEffect, useState } from 'react'

import { configureFileLogger } from '@utils'

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
    configureLogger()
  }, [])

  return isConfigured
}

export default useConfigure
