import router from '../router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false, minimum: 0.8 })

// Permission Verify
router.beforeEach((to, from, next) => {
  if (to.path === from.path) {
    next(false)
    return
  }

  NProgress.start()
  const userLogin = false
  if (!userLogin) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      next('/index')
    } else {
      next()
    }
  }

  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
