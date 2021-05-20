<template>
  <div>
    <h1>{{ count }}</h1>
    <Test @ping="ping" :msg="count"></Test>
  </div>
</template>

<script lang="ts">
import Test from "@/components/test.vue";
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components:{Test},
  setup() {
    const count = ref("hello gva");
    const ping = (pang: string): void => {
      console.log(pang);
      count.value = "pang";
    };
    return {
      count,
      ping
    }
  },
});
</script>

<style scoped></style>
