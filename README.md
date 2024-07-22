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

#### useConfigure(options)

| Option               | Type                                           | Default value                     | Description                                                                                                                                 |
| -------------------- | ---------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| captureConsole       | boolean                                        | true                              | If true, console calls are automatically captured and written to a log file.                                                                |
| dailyRolling         | boolean                                        | true                              | If true, a new log file is created every day                                                                                                |
| formatter            | (level : LogLevel, message : string) => string | {date}--${time}--[level]: message | If true, all console calls are automatically captured and written to a log file.                                                            |
| logLevel             | LogLevel                                       | LogLevel.Debug                    | It states minimum log level for file output (it won't affect console output)                                                                |
| logsDirectory        | string                                         | undefined                         | It states the absolute path of directory where log files are stored. If not defined, log files are stored in the cache directory of the app |
| maximumFileSize      | number                                         | 1024 \* 1024 (1 MB)               | It states the maximum size of log files.                                                                                                    |
| maximumNumberOfFiles | number                                         | 3                                 | It states the maximum number of log files. If the total number of files exceeds this limit, the oldest file is deleted                      |

- Just import and call useConfigure() Hook with required configure options.
- useConfigure() will return a boolean value which states whether the logger is configured or not
- Wrap your component by ConfigProvider and pass same options to it as props

```jsx
import { SafeAreaView } from 'react-native'
import { ConfigProvider, useConfigure } from 'react-native-vs-file-logger'

const App = () => {
  const options = {
    dailyRolling: false,
    maximumFileSize: 2 * 1024 * 1024, // 1 MB,
    maximumNumberOfFiles: 10,
  }

  const isConfigured = useConfigure(options)

  return (
    <ConfigProvider options={options}>
      <SafeAreaView>{isConfigured && <Home />}</SafeAreaView>
    </ConfigProvider>
  )
}

export default App
```

### Log capturing

- Use console API such as console.log , console.error, console.warn etc which are automatically captured and stored in log files.

- In addition to console API's, below defined FileLogger API's can also be used.

  #### FileLogger.debug(msg)

  #### FileLogger.info(msg)

  #### FileLogger.warn(msg)

  #### FileLogger.error(msg)

  #### FileLogger.write(level, msg)

Read more about it here - <a href="https://www.npmjs.com/package/react-native-file-logger">react-native-file-logger</a>

### Example -

```jsx
import { FileLogger, LogList } from 'react-native-vs-file-logger'

const Home = () => {
  console.log('Sample log using console API')

  FileLogger.info('Sample log using FileLogger API')

  return <Text>List of Log Files</Text>
}

export default Home
```

### Render logs files and view its content

- Just import and use LogList component anywhere in your project to render all logs on UI.

```jsx
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
