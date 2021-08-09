<template>
  <div class="main">
    <div class="left">
      <heads :tetl="$t('title')" :logo="logoimg"></heads>
      <menus></menus>
    </div>
    <div class="right">
      <div class="top">
        <Breadcrumb>
          <BreadcrumbItem to="/">Home</BreadcrumbItem>
          <BreadcrumbItem to="/components/breadcrumb"
            >Components</BreadcrumbItem
          >
          <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
        <language></language>
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
    language
  },
  computed: {
    ...mapMutations({}),
    local() {
      return this.$store.state.user.local;
    }
  },
  data() {
    return {
      title: "dakhklhkl",
      logoimg,
      tab0: true,
      tab1: true,
      tab2: true
    };
  },
  methods: {
    handleTabRemove(name) {
      this["tab" + name] = false;
    }
  }
};
</script>
