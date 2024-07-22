import React, { createContext } from 'react'

import { IConfigureOptions } from '../types'

export const ConfigContext = createContext<IConfigureOptions>({})

interface IConfigProviderProps {
  /** children is a required prop which states the children components for ConfigureProvider. */
  children: React.ReactNode
  /** options is a required prop which states the configure options for logger. */
  options: IConfigureOptions
}

export const ConfigProvider = (props: IConfigProviderProps) => {
  const { options, children } = props

  return <ConfigContext.Provider value={options}>{children}</ConfigContext.Provider>
}
