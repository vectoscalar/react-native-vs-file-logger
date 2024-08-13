# react-native-vs-file-logger

## Features

- **Logs Recording:** All console.log/debug/... calls are automatically tracked and logged in to files.
- **View log files on UI:** View the log files along with the contents on UI.
- **Delete log files:** Log Files can be easily deleted through UI.
- **Email File sharing:** Support for sharing files through email.
- **File rolling:** Support for time and size based file rolling, Max number of files (by default 3) and size-limit (by default 1MB) can be configured.

## Prerequisites:-

- Following npm packages should be in your project with their required setup
  1. <a href="https://www.npmjs.com/package/react-native-file-logger">react-native-file-logger</a>
  2. <a href="https://www.npmjs.com/package/react-native-fs">react-native-fs</a>
  3. <a href="https://www.npmjs.com/package/react-native-share">react-native-share</a>
  4. <a href="https://www.npmjs.com/package/react-native-vector-icons"> react-native-vector-icons</a>

## Installation

```jsx
npm i react-native-vs-file-logger
```

## Usage

### Configuring logger

- Wrap your component by ConfigProvider and pass configure options to it as props.

#### Configure options

| Option               | Type                                           | Default value                | Description                                                                                                                                                                                       |
| -------------------- | ---------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| captureConsole       | boolean                                        | true                         | It is an optional prop which specifies whether console calls should be automatically captured and written to a log file.                                                                          |
| dailyRolling         | boolean                                        | true                         | It is an optional prop which specifies whether a new log file should be created every day.                                                                                                        |
| formatter            | (level : LogLevel, message : string) => string | date--time--[level]: message | It is a optional prop which specifies a function that takes the log level and message and returns the formatted string to write to the log file.                                                  |
| logLevel             | LogLevel                                       | LogLevel.Debug               | It is an optional prop which specifies minimum log level for file output (it won't affect console output).                                                                                        |
| logsDirectory        | string                                         | undefined                    | It is an optional prop which specifies the absolute path of directory where log files are stored. If not defined, log files are stored in the cache directory of the app.                         |
| maximumFileSize      | number                                         | 1024 \* 1024 (1 MB)          | It is an optional prop which specifies the maximum size of log files. Specify maximumFileSize = 0 to disable.                                                                                     |
| maximumNumberOfFiles | number                                         | 3                            | It is an optional prop which specifies the maximum number of log files. If the total number of files exceeds this limit, the oldest file is deleted. Specify maximumNumberOfFiles = 0 to disable. |

```jsx
import { ConfigProvider } from 'react-native-vs-file-logger'

import Home from './Home'

const App = () => {
  const options = {
    dailyRolling: false,
    maximumFileSize: 1024 * 1024, // 1 MB,
    maximumNumberOfFiles: 10,
  }

  return (
    <ConfigProvider options={options}>
      <Home />
    </ConfigProvider>
  )
}

export default App
```

### Log capturing

- Use console Api's such as console.log , console.error, console.warn etc. which are automatically captured and stored in log files.

- In addition to console Api's, below defined FileLogger API's can also be used.

### FileLogger.debug(msg)

Shortcut for `FileLogger.write(LogLevel.Debug, msg)`.

### FileLogger.info(msg)

Shortcut for `FileLogger.write(LogLevel.Info, msg)`.

### FileLogger.warn(msg)

Shortcut for `FileLogger.write(LogLevel.Warning, msg)`.

### FileLogger.error(msg)

Shortcut for `FileLogger.write(LogLevel.Error, msg)`.

### FileLogger.write(level, msg)

Append the given message to the log file with the specified log level.

Read more about it here - <a href="https://www.npmjs.com/package/react-native-file-logger">react-native-file-logger</a>

### Example -

```jsx
import { FileLogger } from 'react-native-vs-file-logger'

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
