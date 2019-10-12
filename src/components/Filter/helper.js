export const formatString = source => {
  const date = new Date(source)
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${date.getFullYear()}-${month}-${day}`
}

export const getFirstDateAndLastDate = () => {
  var now = new Date()

  //设置成第一天
  let startDate = new Date().setDate(1)

  //设置当前月最后一天

  let endDate = new Date()
  endDate.setMonth(now.getMonth() + 1)
  endDate.setDate(0)

  startDate = formatString(new Date(startDate))
  endDate = formatString(new Date(endDate))
  return {
    startDate,
    endDate
  }
}

export const isSameDay = (first, two) => {
  const fDate = new Date(first)
  const tDate = new Date(two)
  return (
    fDate.getFullYear() === tDate.getFullYear() &&
    fDate.getMonth() === tDate.getMonth() &&
    fDate.getDate() === tDate.getDate()
  )
}
