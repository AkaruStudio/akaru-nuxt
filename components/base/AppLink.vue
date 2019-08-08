<template>
  <div class="linkComponent">
    <!-- Intern link -->
    <template v-if="type === 'internal'">
      <!-- Force reload -->
      <template v-if="forceReload">
        <a
          :href="to"
          :title="linkTitle">
          <slot />
        </a>
      </template>

      <!-- Normal intern link -->
      <template v-else>
        <nuxt-link
          :to="to"
          :title="linkTitle">
          <slot />
        </nuxt-link>
      </template>
    </template>

    <!-- prevented link -->
    <template v-if="type === 'prevented'">
      <a
        @click.prevent.stop="$emit('click')"
        href="#"
        :title="title">
        <slot />
      </a>
    </template>


    <!-- External link -->
    <template v-if="type === 'external'">
      <a
        :href="to"
        :title="linkTitle"
        target="_blank"
        rel="noreferrer">
        <slot />
      </a>
    </template>

    <!-- Tel, Mail -->
    <template v-if="type === 'tel' || type === 'email'">
      <no-ssr>
        <a
          :href="contactLink"
          :title="linkTitle"
          target="_blank"
          rel="noreferrer">
          <slot />
        </a>
      </no-ssr>
    </template>
  </div>
</template>

<script>
import { isOneOf } from 'assets/js/props-validations.js'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: value => isOneOf(value, 'external', 'internal', 'email', 'tel', 'prevented')
    },
    forceReload: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    to: {
      type: String,
      required: false,
      default: null
    },
    tel: {
      type: String,
      required: false,
      default: null
    },
    email: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    contactLink () {
      if (this.type === 'email') return 'mailto:' + this.email
      if (this.type === 'tel') return 'tel:' + this.tel

      return ''
    },
    linkTitle () {
      if (this.title) return this.title

      if (this.type === 'email') return `Envoyez un email à ${this.email}`
      if (this.type === 'tel') return `Appelez le ${this.tel}`
      if (this.text) return `Voir la page ${this.text}`

      return 'Voir cette page'
    }
  }
}
</script>

<style lang="stylus" scoped>
  a
    display inline-block
    width 100%
    height 100%
</style>
