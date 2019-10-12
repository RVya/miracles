export const onlyNumberFilter = source => {
  if (!source || typeof source !== 'string') {
    /* eslint-disable */
    console.warn('source is not string')
    return ''
  }

  return source.replace(/\D/g, '')
}
