<template>
  <div class="main">
    <div class="left">
      <heads :tetl="$t('title')" :logo="logoimg"></heads>
      <menus></menus>
    </div>
    <div class="right">
      <div class="top">
        <!-- <Breadcrumb>
          <BreadcrumbItem to="/">Home</BreadcrumbItem>
          <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
          <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb> -->
        <Input style="width:200px" />
        <language />
      </div>
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="标签一" v-if="tab0"></TabPane>
        <TabPane label="标签二" v-if="tab1"></TabPane>
        <TabPane label="标签三" v-if="tab2"></TabPane>
      </Tabs>
      <div class="main-body">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import heads from "./header/header";
import menus from "./menus/menus";
import logoimg from "@/assets/logo.png";
import language from "./language/language";
import { mapMutations } from "vuex";
export default {
  components: {
    heads,
    menus,
    language,
  },
  computed: {
    ...mapMutations({}),
    local() {
      return this.$store.state.user.local;
    },
  },
  data() {
    return {
      logoimg,
      tab0: true,
      tab1: true,
      tab2: true,
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
  },
};
</script>

<style lang="less">
.main {
  height: 100%;
  position: relative;
  .left {
    position: absolute;
    width: 240px;
    height: 100%;
    overflow: hidden;
  }
  .right {
    position: absolute;
    left: 240px;
    height: 100%;
    width: ~"calc(100% - 240px)";
    overflow: hidden;
    background: #fff;
    .top{
      
    }
    .ivu-tabs-bar {
      margin: 0;
    }
    .main-body {
      height: ~"calc(100% - 64px)";
      // padding: 0 16px;
      // margin: 16px;
      margin-right: 0;
      overflow-y: auto;
      background: #eee;
    }
  }
}
</style>