export const debounce = (fn, delay = 30) => {
  let timer
  return () => {
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
}
