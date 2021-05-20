<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>


<style lang="scss">
// 引入初始化样式
@import '@/style/main.scss';
@import '@/style/base.scss';
#app {
  background: #eee;
  height: 100vh;
  overflow: hidden;
}
</style>