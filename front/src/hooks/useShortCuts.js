export default function() {
  const end = new Date()
  return (
    [
      {
        text: '上月',
        value: () => {
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '上周',
        value: () => {
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '今日',
        value: () => {
          const start = new Date()
          return [start, end]
        }
      }
    ]
  )
}
