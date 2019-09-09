import { debounce } from '@qneyraud/q-utils'

export default ({ app }) => {
  const debounced = debounce(() => {
    app.$bus.$emit('resize')
  }, 300)

  window.addEventListener('resize', () => {
    debounced()
  })
}
