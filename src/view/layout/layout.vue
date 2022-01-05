<template>
  <div>
    {{user.count}}
  <div @click="test">++</div>
  <div @click="test2">--</div>
  <Test></Test>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { useCounterStore } from "@/pinia/user"
import { ref } from "vue";
import Test from "@/components/test.vue"
const user = useCounterStore()
const test = ()=>{
  user.count++
  user.increment()
  user.$patch({count:user.count+1})
}

const test2 = ()=>{
  user.count--
}
const count = ref("hello gva");
const ping = (pang: string): void => {
  console.log(pang);
  count.value = "pang";
};
</script>

<style scoped>
.el-upload-dragger{
      background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-upload-dragger .el-icon--upload {
    font-size: 67px;
    color: var(--el-text-color-placeholder);
    margin: 40px 0 16px;
    line-height: 50px;
}
</style>
