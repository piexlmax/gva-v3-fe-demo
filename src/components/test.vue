<template>
  <div @click="pang">
    {{ msg }}
    <el-button>test</el-button>
    {{user.count}}
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {test} from "@/api/test"
import { useCounterStore } from "@/pinia/user";
export default defineComponent({
  props: {
    msg: String,
  },
  setup(props, context) {
    const user = useCounterStore()
    const pang = (): void => {
      context.emit("ping", "pang");
      return;
    }
    onMounted(() => {
      // test()
    })
    return { pang, msg: props.msg,user };
  },
});
</script>
