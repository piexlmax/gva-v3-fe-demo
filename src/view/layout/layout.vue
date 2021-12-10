<template>
  <div>
    <h1>{{ count }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const count = ref("hello gva");
const ping = (pang: string): void => {
  console.log(pang);
  count.value = "pang";
};
</script>

<style scoped></style>
