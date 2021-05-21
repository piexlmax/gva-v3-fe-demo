<template>
  <component :is="menuComponent" :routerInfo="routerInfo" v-if="!routerInfo.hidden">
    <template v-if="routerInfo.children&&routerInfo.children.length">
      <AsideComponent :key="item.name" :routerInfo="item" v-for="item in routerInfo.children" />
    </template>
  </component>
</template>

<script lang="ts">
import MenuItem from './menuItem'
import AsyncSubmenu from './asyncSubmenu'
import {computed, defineComponent} from "vue";

export default defineComponent( {
  name: 'AsideComponent',
  components: {
    MenuItem,
    AsyncSubmenu
  },
  setup(props){

    const menuComponent = computed(()=>{
      if (props.routerInfo.children&&props.routerInfo.children.filter(item=>!item.hidden).length) {
        return 'AsyncSubmenu'
      } else {
        return 'MenuItem'
      }
    })
    return {
      menuComponent
    }
  },

  props: {
    routerInfo: {
      default: function() {
        return null
      },
      type: Object
    }
  },

})
</script>
<style lang="scss">
</style>
