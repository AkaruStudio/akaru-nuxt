# akaru-nuxt

> Nuxt template by Akaru Studio

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build
$ npm run build
$ npm run build:preprod
$ npm run build:prod

# launch server
$ npm start

# generate static project
$ npm run generate
$ npm run generate:preprod
$ npm run generate:prod

# generate static project and zip dist folder in ./zips
$ npm run generate -- --zip
$ npm run generate:preprod -- --zip
$ npm run generate:prod -- --zip
```

## Links

[Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## Features

#### Intersection observer

```vue
<template>
  <div>
    <!-- Triggered only one time -->
    <div class="content observe-once">
      bla bla bla
    </div>

    <!-- Triggered each time -->
    <div class="slider observe">
      bla bla bla
    </div>
  </div>
</template>

<script>
import IntersectionObserverMixin from 'mixins/IntersectionObserverMixin'

export default {
  mixins: [IntersectionObserverMixin],
  methods: {
    onIntersect (el) {
      // receive intersecting element in el
    },
    onIntersectLeave (el) {
      // receive element which leave intersection in el
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    // when .content is intersecting
    &.in-view
      background-color red
</style>
```

#### Stylus + grid

- all setup with grid system and breakpoints
- customisable in `assets/styles/variables.styl`
- grid mixins

```stylus
// takes 10 columns in the grid and pushed by 1
.content
  size(10)
  push(1)
  // font(font family, font size, line height, font weight, color, font style)
  font(Roboto, 30, 32, 700, red, italic)

  // mobile breakpoint
  +mobile-up()
    size(6)
    push(4)

  // and all others
  +tablet-up()
  +desktop-up()
  +large-up()
  +xlarge-up()
```

#### images + lazyload

```vue
<template>
  <app-image source="http://placecorgi.com/260/180" alt="image" />
</template>

<script>
// components
import AppImage from 'components/AppImage'

export default {
  components: {
    AppImage
  }
}
</script>
```

AppImage component has props:

- `lazyload`: boolean
- `lazyload-type`: string, one of `direct` (lazyload after page init), `intersection` (use intersection observer to lazyload image when it become visible) or `called` (you have to call `this.$refs.myImage.lazyloadImage()`)
- `placement`: string, `object-fit` style rule
- `position`: string, `object-position` style rule
- `background`: string, background color

And emit `loaded` event

And has `loading` or `loaded` CSS classes



#### Svg

```vue
<template>
  <div>
    <app-svg name="user" />
  </div>
</template>

<script>
import AppSvg from 'components/AppSvg'

export default {
  components: {
    AppSvg
  }
}
</script>

```

#### metas

All metas are customisable in `nuxt.config.js`

Can be updated per page :

```vue
<template>
  <div>
    <h1>About</h1>
  </div>
</template>

<script>
import MetasMixin from 'mixins/MetasMixin'

export default {
  mixins: [MetasMixin],
  data () {
    return {
      title: 'My project - About',
      description: 'This is the about page',
      image: require('assets/images/about/share.jpg')
    }
  }
}
</script>
```

#### events

- Use an event bus
- Optimize : cancel event listener when all callbacks are removed

```js
// window click events
this.$e.on('click', () => console.log('click'))
// or change target
this.$e.on({
  target: document,
  eventName: 'click'
}, () => console.log('click'))

// RequestAnimationFrame
this.$e.on('raf', ({ dt }) => {
  // console.log('tick', dt)
})
// cancelled when all callbacks are removed
this.$e.off('raf)

// Also work with custom events
this.$e.on('say_hi', (name) => console.log(`Hello ${name}`))
this.$e.$emit('say_hi', 'Akaru')
```

#### Appear component

Add appear animations in component style

```vue
// components/Appear.vue

<style lang="stylus" scoped>
  .appearComponent
    &.fade
      opacity 0
      transition opacity 0.5s

      &.in-view
        opacity 1

    &.fade-up
      opacity 0
      transform translateY(30px)
      transition opacity 0.5s, transform 0.8s

      &.in-view
        transform translateY(0)
        opacity 1
</style>
```

Then use it 

```vue
<template>
  <div>
    <appear name="fade-up">
      <h1>Hello</h1>
    </appear>
  </div>
</template>

<script>
// components
import Appear from 'components/Appear'

export default {
  components: {
    Appear
  }
}
</script>
```

#### store loading

Keep infos on all XHR requests and assets loading in the `loading` store

```vue
<template>
  <div>
    <p v-if="hasAssetsLoading">
      Assets loading
    </p>
    <p v-if="hasPendingRequest">
      Pending request
    </p>
    <p v-if="isLoading">
      is loading
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      hasPendingRequest: 'loading/hasPendingRequest',
      hasAssetsLoading: 'loading/hasAssetsLoading',
      isLoading: 'loading/isLoading'
    })
  },
  mounted () {
    /**
     * XHR requests
     */
    this.$store.dispatch('loading/ADD_PENDING_REQUEST')
    // simulate API call
    window.setTimeout(() => {
      this.$store.dispatch('loading/REMOVE_PENDING_REQUEST')
    }, 1500)

    /**
     * Assets loading
     */
    this.$store.dispatch('loading/ADD_ASSET_LOADING')
    // simulate ressource loading
    import('assets/images/home/share.jpg')
      .then(myFile => {
        this.$store.dispatch('loading/REMOVE_ASSET_LOADING')
      })
  }
}
</script>
```


#### store window

All window infos are stored in the `window` store and updated on page resize

```js
// example of window state populated

{
  breakpoint: "desktop",
  browser: {
    name: "chrome",
    os: "Mac OS",
    version: "73.0.3683"
  },
  height: 969,
  isDesktop: true,
  isLarge: false,
  isMobile: true,
  isMobileDevice: false,
  isTablet: true,
  isXlarge: false,
  webgl: true,
  width: 1014
}
```
