/**
 * format routerMap
 * @param {*} router
 * @returns
 */

export const resolveRouter = routers => {
  const routerMap = new Map()
  routers
    .filter(r => r.children && r.children.length)
    .map(r => {
      if (r.children.length === 1) {
        return [
          {
            ...r.children[0],
            navbarMeta: [r.children[0].meta]
          }
        ]
      } else if (r.children.length > 1) {
        return r.children.map(child => {
          return {
            ...child,
            navbarMeta: [r.meta, child.meta]
          }
        })
      }
    })
    .filter(r => Array.isArray(r))
    .reduce((prev, cur) => {
      return [...prev, ...cur]
    }, [])
    .map(r => {
      routerMap.set(`${r.path}`, r.navbarMeta)
    })
  return routerMap
}
