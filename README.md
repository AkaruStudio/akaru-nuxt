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
#### svg

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
#### store loading
#### store window
