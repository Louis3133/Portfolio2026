<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden crt-blue scanlines">
    <AppNavbar :title="route.meta.title" />
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
main {
  @include mq($from desktop) {
    border-block: 3px solid $primary;
    margin-block: 4px;
  }
}
</style>
