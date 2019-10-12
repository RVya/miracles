'use strict'

export const checkPermission = () => {
  let result = undefined
  if (Notification.permission === 'granted') {
    /* eslint-disable */
    result = true
  } else if (Notification.permission === 'denied') {
    result = false
    console.warn('用户拒绝通知')
  } else {
    console.warn('用户还没选择，去向用户申请权限吧')
  }
  return result
  /* eslint-enable */
}

export const requestPermission = () => {
  let result = undefined

  Notification.requestPermission().then(function(permission) {
    /* eslint-disable */
    if (permission === 'granted') {
      console.info('用户允许通知')
      result = true
    } else if (permission === 'denied') {
      console.warn('用户拒绝通知')
      result = false
    }
  })
  return result
  /* eslint-enable */
}

const broadcast = option => {
  var n = new Notification('状态更新提醒', {
    body: '你的朋友圈有3条新状态，快去查看吧',
    tag: '',
    icon: 'http://blog.gdfengshuo.com/images/avatar.jpg',
    requireInteraction: true,
    ...option
  })
  setTimeout(function() {
    n.close()
  }, 3000)
}

export const broadcastNotification = option => {
  if (checkPermission == undefined) {
    if (requestPermission()) {
      broadcast(option)
    }
  } else if (!checkPermission()) {
    /* eslint-disable */
    console.warn('用户拒绝通知')
  } else {
    broadcast(option)
  }
}
