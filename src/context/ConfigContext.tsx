import React, { createContext } from 'react'

import { useConfigure } from '../hooks'
import { IConfigureOptions } from '../types'

export const ConfigContext = createContext<IConfigureOptions>({})

interface IConfigProviderProps {
  /** children is a required prop which states the children components for ConfigureProvider. */
  children: React.ReactNode
  /** options is an optional prop which states the configure options for logger. */
  options?: IConfigureOptions
}

const ConfigProvider = (props: IConfigProviderProps) => {
  const { options = {}, children } = props
  const isConfigured = useConfigure(options)

  return <ConfigContext.Provider value={options}>{isConfigured && children}</ConfigContext.Provider>
}

export default ConfigProvider
