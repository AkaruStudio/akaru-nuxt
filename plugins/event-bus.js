import Vue from 'vue'

export default (_, inject) => {
  inject('bus', new Vue())
}
