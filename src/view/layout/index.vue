<template>
  <el-container class="layout-cont">
    <el-container
      :class="[isSider ? 'openside' : 'hideside', isMobile ? 'mobile' : '']"
    >
      <el-row
        :class="[isShadowBg ? 'shadowBg' : '']"
        @click.native="changeShadow()"
      ></el-row>
      <el-aside class="main-cont main-left">
        <div class="tilte">
          <img alt class="logoimg" src="~@/assets/nav_logo.png" />
          <h2 class="tit-text" v-if="isSider">Gin-Vue-Admin</h2>
        </div>
        <Aside class="aside" />
      </el-aside>
      <!-- 分块滑动功能 -->
      <el-main class="main-cont main-right">
        <transition
          :duration="{ enter: 800, leave: 100 }"
          mode="out-in"
          name="el-fade-in-linear"
        >
          <div
            :style="{
              width: `calc(100% - ${
                isMobile ? '0px' : isCollapse ? '54px' : '220px'
              })`,
            }"
            class="topfix"
          >
            <el-row>
              <!-- :xs="8" :sm="6" :md="4" :lg="3" :xl="1" -->
              <el-header class="header-cont">
                <el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1">
                  <div @click="totalCollapse" class="menu-total">
                    <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                    <i class="el-icon-s-fold" v-else></i>
                  </div>
                </el-col>
                <el-col :xs="10" :lg="14" :md="14" :sm="9" :xl="14">
                  <el-breadcrumb
                    class="breadcrumb"
                    separator-class="el-icon-arrow-right"
                  >
                    <el-breadcrumb-item
                      :key="item.path"
                      v-for="item in matched.slice(1, matched.length)"
                      >{{ item.meta.title }}</el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
                <el-col :xs="12" :lg="9" :md="9" :sm="14" :xl="9">
                  <div class="fl-right right-box">
                    <Search />
                    <Screenfull
                      class="screenfull"
                      :style="{ cursor: 'pointer' }"
                    ></Screenfull>
                    <el-dropdown>
                      <span class="header-avatar">
                        <CustomPic />
                        <span style="margin-left: 5px">{{
                          userInfo.nickName
                        }}</span>
                        <i class="el-icon-arrow-down"></i>
                      </span>
                      <el-dropdown-menu class="dropdown-group" slot="dropdown">
                        <el-dropdown-item>
                          <span>
                            更多信息
                            <el-badge is-dot />
                          </span>
                        </el-dropdown-item>
                        <el-dropdown-item
                          @click.native="toPerson"
                          icon="el-icon-s-custom"
                          >个人信息</el-dropdown-item
                        >
                        <el-dropdown-item
                          @click.native="LoginOut"
                          icon="el-icon-table-lamp"
                          >登 出</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-col>
              </el-header>
            </el-row>
            <!-- 当前面包屑用路由自动生成可根据需求修改 -->
            <!--
            :to="{ path: item.path }" 暂时注释不用-->
            <HistoryComponent />
          </div>
        </transition>
        <transition mode="out-in" name="el-fade-in-linear">
          <keep-alive>
            <router-view
              v-loading="loadingFlag"
              element-loading-text="正在加载中"
              class="admin-box"
              v-if="$route.meta.keepAlive && reloadFlag"
            ></router-view>
          </keep-alive>
        </transition>
        <transition mode="out-in" name="el-fade-in-linear">
          <router-view
            v-loading="loadingFlag"
            element-loading-text="正在加载中"
            class="admin-box"
            v-if="!$route.meta.keepAlive && reloadFlag"
          ></router-view>
        </transition>
        <BottomInfo />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {ref, defineComponent, reactive, nextTick, computed, onMounted} from "vue";
import Aside from "@/view/layout/aside";
import HistoryComponent from "@/view/layout/aside/historyComponent/history";
import Screenfull from "@/view/layout/screenfull";
import Search from "@/view/layout/search/search";
import BottomInfo from "@/view/layout/bottomInfo/bottomInfo";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Bus from "@/utils/bus"
import CustomPic from "@/components/customPic";

export default defineComponent({
  name: "Layout",
  components: {
    Aside,
    HistoryComponent,
    Screenfull,
    Search,
    BottomInfo,
    CustomPic
  },
  setup() {
    const Router = useRouter()
    const Route = useRoute()
    const Store = useStore()
    // TODO: Store 导出 user， userInfo

    const data =reactive({
      show: false,
      isCollapse: false,
      isSider: true,
      isMobile: false,
      isShadowBg: false,
      loadingFlag:false,
      reloadFlag:true,
      value: ''
    })
    const methods = {
      reload:()=>{
        data.reloadFlag = false
        nextTick(()=>{
          data.reloadFlag = true
        })
      },
      totalCollapse:()=> {
        data.isCollapse = !data.isCollapse
        data.isSider = !data.isCollapse
        data.isShadowBg = !data.isCollapse
        Bus.emit('collapse', data.isCollapse)
      },
      toPerson:()=> {
        Router.push({ name: 'person' })
      },
      changeShadow:()=> {
        data.isShadowBg = !data.isShadowBg
        data.isSider = !!data.isCollapse
        methods.totalCollapse()
      },
    }
    const title = computed(()=>{
      return Route.meta?.title  ||"当前页面"
    })
    const matched = computed(()=>{
      return Route.matched
    })
    onMounted(()=>{
      let screenWidth = document.body.clientWidth
      if (screenWidth < 1000) {
        data.isMobile = true
        data.isSider = false
        data.isCollapse = true
      } else if (screenWidth >= 1000 && screenWidth < 1200) {
        data.isMobile = false
        data.isSider = false
        data.isCollapse = true
      } else {
        data.isMobile = false
        data.isSider = true
        data.isCollapse = false
      }
      Bus.emit('collapse', data.isCollapse)
      Bus.emit('mobile', data.isMobile)
      Bus.on("reload",methods.reload)
      Bus.on("showLoading",()=>{
        data.loadingFlag = true
      })
      Bus.on("closeLoading",()=>{
        data.loadingFlag = false
      })
      window.onresize = () => {
        return (() => {
          let screenWidth = document.body.clientWidth
          if (screenWidth < 1000) {
            data.isMobile = true
            data.isSider = false
            data.isCollapse = true
          } else if (screenWidth >= 1000 && screenWidth < 1200) {
            data.isMobile = false
            data.isSider = false
            data.isCollapse = true
          } else {
            data.isMobile = false
            data.isSider = true
            data.isCollapse = false
          }
          Bus.emit('collapse', this.isCollapse)
          Bus.emit('mobile', this.isMobile)
        })()
      }
    })
    return {
      title,
      matched,
      ...data,
      ...methods
    };
  },
});
</script>

<style lang="scss">
  @import '@/style/mobile.scss';
</style>
