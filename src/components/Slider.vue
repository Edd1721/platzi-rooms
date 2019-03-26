<template>
  <tiny-slider
    :mouse-drag="options.mouseDrag"
    :auto-init="options.autoInit"
    :loop="options.loop"
  >
    <slot></slot>
  </tiny-slider>
</template>
<script>
import VueTinySlider from 'vue-tiny-slider'

export default {
  name: 'Slider',
  components: {
    'tiny-slider': VueTinySlider
  },
  props: {
    options: {
      type: Object,
      default: () => (
        {
          mouseDrag: false,
          loop: true,
          autoInit: true,
          controls: true
        }
      )
    }
  }
}
</script>
<style lang="scss">
@import './node_modules/tiny-slider/src/tiny-slider.scss';
</style>
