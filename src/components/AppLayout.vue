<template>
  <div>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">Home</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 50px 50px 0px 50px">
        <div>
          <router-view />
        </div>
    </a-layout-content>
  </a-layout>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
