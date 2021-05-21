<template>
  <div>
    <el-scrollbar style="height:calc(100vh - 64px)">
      <transition :duration="{ enter: 800, leave: 100 }" mode="out-in" name="el-fade-in-linear">
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="true"
          :default-active="active"
          @select="selectMenuItem"
          active-text-color="#fff"
          class="el-menu-vertical"
          text-color="rgb(191, 203, 217)"
          unique-opened
        >
          <template v-for="item in asyncRouters[0].children">
            <aside-component :key="item.name" :routerInfo="item" v-if="!item.hidden" />
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";
import AsideComponent from "@/view/layout/aside/asideComponent";
import {defineComponent, onBeforeUnmount, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import Bus from "@/utils/bus";

export default defineComponent( {
  name: "Aside",
  components: {
    AsideComponent
  },
  setup(){

    const Router = useRouter()
    const Route = useRoute()

    const data = reactive({
      active: "",
      isCollapse: false
    })
    const methods = {
      selectMenuItem:(index, _, ele)=> {
        const query = {};
        const params = {};
        ele.route.parameters &&
        ele.route.parameters.map(item => {
          if (item.type == "query") {
            query[item.key] = item.value;
          } else {
            params[item.key] = item.value;
          }
        });
        if (index === Route.name) return;
        if (index.indexOf("http://") > -1 || index.indexOf("https://") > -1) {
          window.open(index);
        } else {
          Router.push({ name: index, query, params });
        }
      }
    }
    data.active = Route.name;
    let screenWidth = document.body.clientWidth;
    if (screenWidth < 1000) {
      data.isCollapse = !data.isCollapse;
    }

    Bus.on("collapse", item => {
      data.isCollapse = item;
    });
    onBeforeUnmount(()=>{
      Bus.off("collapse");
    })
    return {
      ...data,
      ...methods
    }
  },

  methods: {
    ...mapMutations("history", ["addHistory"]),

  },
  computed: {
    ...mapGetters("router", ["asyncRouters"])
  },

  watch: {
    $route() {
      this.active = this.$route.name;
    }
  },
});
</script>

<style lang="scss">
.el-scrollbar {
  .el-scrollbar__view {
    height: 100%;
  }
}
.menu-info {
  .menu-contorl {
    line-height: 52px;
    font-size: 20px;
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
