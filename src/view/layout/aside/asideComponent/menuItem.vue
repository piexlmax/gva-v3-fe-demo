<template>
  <el-menu-item :index="routerInfo.name" :route="{parameters:routerInfo.parameters}">
    <i :class="'el-icon-'+routerInfo.meta.icon"></i>
    <span slot="title">{{routerInfo.meta.title}}</span>
  </el-menu-item>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'MenuItem',
  props: {
    routerInfo: {
      default: function() {
        return null
      },
      type: Object
    }
  }
})
</script>
<style lang="scss">
</style>
