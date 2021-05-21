<template>
  <div class="router-history">
    <el-tabs
      :closable="!(historys.length==1&&this.$route.name==defaultRouter)"
      @contextmenu.prevent.native="openContextMenu($event)"
      @tab-click="changeTab"
      @tab-remove="removeTab"
      type="card"
      v-model="activeValue"
    >
      <el-tab-pane
        :key="item.name + JSON.stringify(item.query)+JSON.stringify(item.params)"
        :label="item.meta.title"
        :name="item.name + JSON.stringify(item.query)+JSON.stringify(item.params)"
        :tab="item"
        v-for="item in historys"
      ></el-tab-pane>
    </el-tabs>

    <!--自定义右键菜单html代码-->
    <ul :style="{left:left+'px',top:top+'px'}" class="contextmenu" v-show="contextMenuVisible">
      <li @click="closeAll">关闭所有</li>
      <li @click="closeLeft">关闭左侧</li>
      <li @click="closeRight">关闭右侧</li>
      <li @click="closeOther">关闭其他</li>
    </ul>
  </div>
</template>
<script>
import {mapGetters, useStore} from "vuex";
import {computed, defineComponent, onBeforeUnmount, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import Bus from "@/utils/bus"
 const getFmtString = (item)=>{
         return item.name +
            JSON.stringify(item.query) +
            JSON.stringify(item.params)
    }
export default defineComponent({
  name: "HistoryComponent",
  setup(){
    const Router = useRouter()
    const Route = useRoute()
    const Store = useStore()
    const userInfo = Store.state.state.userInfo
    const defaultRouter = computed(()=>{
      return userInfo.authority.defaultRouter;
    })

    const data = reactive({
      historys: [],
      activeValue: "",
      contextMenuVisible: false,
      left: 0,
      top: 0,
      isCollapse: false,
      isMobile: false,
      rightActive: ""
    })
    const methods= {
      openContextMenu:(e)=> {
        if (data.historys.length == 1 && Route.name == defaultRouter) {
          return false;
        }
        if (e.srcElement.id) {
          data.contextMenuVisible = true;
          let width;
          if (data.isCollapse) {
            width = 54;
          } else {
            width = 220;
          }
          if (data.isMobile) {
            width = 0;
          }
          data.left = e.clientX - width;
          data.top = e.clientY + 10;
          data.rightActive = e.srcElement.id.split("-")[1];
        }
      },
      closeAll:()=> {
        data.historys = [
          {
            name: defaultRouter,
            meta: {
              title: "首页"
            },
            query: {},
            params: {}
          }
        ];
        Router.push({ name: defaultRouter });
        data.contextMenuVisible = false;
        sessionStorage.setItem("historys", JSON.stringify(data.historys));
      },
      closeLeft:()=> {
        let right;
        const rightIndex = data.historys.findIndex(item => {
          if (getFmtString(item) == data.rightActive) {
            right = item;
          }
          return (
              getFmtString(item) == data.rightActive
          );
        });
        const activeIndex = data.historys.findIndex(
            item => getFmtString(item) == data.activeValue
        );
        data.historys.splice(0, rightIndex);
        if (rightIndex > activeIndex) {
          Router.push(right);
        }
        sessionStorage.setItem("historys", JSON.stringify(data.historys));
      },
      closeRight:()=> {
        let right;
        const leftIndex = data.historys.findIndex(item => {
          if ( getFmtString(item) ==  data.rightActive ) {
            right = item;
          }
          return ( getFmtString(item) == data.rightActive );
        });
        const activeIndex = data.historys.findIndex(
            item => getFmtString(item) == data.activeValue
        );
        data.historys.splice(leftIndex + 1, data.historys.length);
        if (leftIndex < activeIndex) {
          Router.push(right);
        }
        sessionStorage.setItem("historys", JSON.stringify(data.historys));
      },
      closeOther:()=> {
        let right;
        data.historys = data.historys.filter(item => {
          if ( getFmtString(item) == data.rightActive
          ) {
            right = item;
          }
          return ( getFmtString(item) == data.rightActive
          );
        });
        Router.push(right);
        sessionStorage.setItem("historys", JSON.stringify(data.historys));
      },
      isSame:(route1, route2)=> {
        if (route1.name != route2.name) {
          return false;
        }
        for (let key in route1.query) {
          if (route1.query[key] != route2.query[key]) {
            return false;
          }
        }
        for (let key in route1.params) {
          if (route1.params[key] != route2.params[key]) {
            return false;
          }
        }
        return true;
      },
      setTab:(route)=> {
        if (!data.historys.some(item => this.isSame(item, route))) {
          const obj = {};
          obj.name = route.name;
          obj.meta = route.meta;
          obj.query = route.query;
          obj.params = route.params;
          data.historys.push(obj);
        }
        window.sessionStorage.setItem(
            "activeValue",
            getFmtString(Route)
        );
      },
      changeTab:(component)=> {
        const tab = component.$attrs.tab;
        Router.push({
          name: tab.name,
          query: tab.query,
          params: tab.params
        });
      },
      removeTab:(tab)=> {
        const index = data.historys.findIndex(
            item => getFmtString(item) ==  tab
        );
        if (
            getFmtString(Route) == tab
        ) {
          if (data.historys.length == 1) {
            Router.push({ name: defaultRouter });
          } else {
            if (index < data.historys.length - 1) {
              tRouter.push({
                name: data.historys[index + 1].name,
                query: data.historys[index + 1].query,
                params: data.historys[index + 1].params
              });
            } else {
              Router.push({
                name: data.historys[index - 1].name,
                query: data.historys[index - 1].query,
                params: data.historys[index - 1].params
              });
            }
          }
        }
        data.historys.splice(index, 1);
      }
    }
    Bus.on("mobile", isMobile => {
      data.isMobile = isMobile;
    });
    Bus.on("collapse", isCollapse => {
      data.isCollapse = isCollapse;
    });
    const initHistorys = [
      {
        name: defaultRouter,
        meta: {
          title: "首页"
        },
        query: {},
        params: {}
      }
    ];
    data.historys =
        JSON.parse(sessionStorage.getItem("historys")) || initHistorys;
    if(!window.sessionStorage.getItem("activeValue")){
      data.activeValue = getFmtString(Route)
    }else{
      data.activeValue = window.sessionStorage.getItem("activeValue");
    }
    methods.setTab(Route);
    onBeforeUnmount(()=>{
      Bus.off("collapse");
      Bus.off("mobile");
    })
    return{
      ...data,
      ...methods
    }
  },


  watch: {
    contextMenuVisible() {
      if (this.contextMenuVisible) {
        document.body.addEventListener("click", () => {
          this.contextMenuVisible = false;
        });
      } else {
        document.body.removeEventListener("click", () => {
          this.contextMenuVisible = false;
        });
      }
    },
    $route(to, now) {
      this.historys = this.historys.filter(item => !item.meta.closeTab);
      this.setTab(to);
      sessionStorage.setItem("historys", JSON.stringify(this.historys));
      this.activeValue = window.sessionStorage.getItem("activeValue");
      if (now && to && now.name == to.name) {
        this.$bus.$emit("reload");
      }
    }
  }
});
</script>
<style lang="scss">
.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
</style>
