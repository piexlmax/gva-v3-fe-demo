<template>
  <div class="search-component">
    <transition name="el-fade-in-linear">
      <div class="transition-box" style="display: inline-block; " v-show="show">
        <el-select
          ref="searchInput"
          @blur="hiddenSearch"
          @change="changeRouter"
          filterable
          placeholder="请选择"
          v-model="value"
        >
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in routerList"
          ></el-option>
        </el-select>
      </div>
    </transition>
    <div
      :style="{display:'inline-block',float:'right',width:'31px',textAlign:'left',fontSize:'16px',paddingTop:'2px'}"
      class="user-box"
    >
      <i @click="$bus.$emit('reload')" :style="{cursor:'pointer'}" class="el-icon-refresh" />
    </div>
    <div :style="{display:'inline-block',float:'right'}" class="user-box">
      <i :style="{cursor:'pointer'}" @click="showSearch()" class="el-icon-search search-icon"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore} from "vuex";
import {defineComponent, reactive, nextTick, ref, computed} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "searchComponent",
  setup(){
    const Router = useRouter()
    const searchInput = ref()
    const Store = useStore()
    const routerList = computed(()=>{
      return Store.state.routerList
    })
    const data = reactive({
      value: "",
      show: false
    })
    const methods = {
      changeRouter:()=> {
        Router.push({ name: data.value });
        data.value = "";
      },
      hiddenSearch:()=> {
        data.show = false;
      },
      showSearch:()=> {
        data.show = true;
        nextTick(() => {
          searchInput.focus();
        });
      }
    }
    return {
      ...data,
      ...methods,
      searchInput,
      routerList
    }
  },
});
</script>
<style lang="scss">
</style>
