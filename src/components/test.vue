<template>
  <div @click="pang">
    {{ msg }}
    <el-button>test</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {test} from "@/api/test"
export default defineComponent({
  props: {
    msg: String,
  },
  setup(props, context) {
    const pang = (): void => {
      context.emit("ping", "pang");
      return;
    }
    onMounted(() => {
      // test()
    })
    return { pang, msg: props.msg };
  },
});
</script>
