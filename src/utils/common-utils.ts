export const getDateTime = (isoString: string): { date: string; time: string } => {
  const dateObj = new Date(isoString)
  const IST_OFFSET_MS = 330 * 60 * 1000
  const istTime = new Date(dateObj.getTime() + IST_OFFSET_MS)
  const year = istTime.getUTCFullYear()
  const month = (istTime.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = istTime.getUTCDate().toString().padStart(2, '0')
  const hours = istTime.getUTCHours().toString().padStart(2, '0')
  const minutes = istTime.getUTCMinutes().toString().padStart(2, '0')
  const seconds = istTime.getUTCSeconds().toString().padStart(2, '0')
  return {
    date: `${day}-${month}-${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  }
}

export const getFormattedFileName = (fileName: string, lastModifiedTime: string): string => {
  const baseName = fileName.replace('.log', '')
  const parts = baseName.split(/[\s-]/)
  const { date, time } = getDateTime(lastModifiedTime)
  const formattedFileName = `${parts[0]}--${date}--${time}`
  return formattedFileName
}
