// import { TweenMax } from 'gsap'

export default ({ app }) => {
  // TweenMax.ticker.addEventListener('tick', () => {
  //   app.$bus.$emit('tick')
  // })

  const loop = () => {
    app.$bus.$emit('tick')

    window.requestAnimationFrame(loop)
  }

  loop()
}
