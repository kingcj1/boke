<template>
  <div class="language">
    <Dropdown @on-click="selectLang">
      <a href="javascript:void(0)">
        语言
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(value, key) in localList"
          :key="`lang-${key}`"
          :name="key"
          >{{ value }}</DropdownItem
        >
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localList: {
        zh: "中文简体",
        en: "English",
      },
    };
  },
  methods: {
    selectLang(lang) {
      this.$i18n.locale = lang;
      this.$store.commit("SETLOCAL", lang);
    },
  },
};
</script>

<style lang="less" scoped>
.language{
  display: inline-block;
}
</style>