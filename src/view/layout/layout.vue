<template>
  <div>
   <el-upload
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖拽文件到此或 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from "vue";
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
