export const formatStopAssignTime = time => {
  if (new Date(time).toString() === 'Invalid Date') {
    /* eslint-disable */
    console.warn('Stop Assign Time, Not A Valid Date!', time)
    return
  }

  let target = null
  const currentTimezone = new Date().getTimezoneOffset() / 60

  if (currentTimezone == -8) {
    target = new Date(time)
  } else {
    const temp = new Date(time)
    temp.setHours(temp.getHours() + 1)
    target = new Date(temp)
  }

  return target.toString()
}
