<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden crt-blue scanlines">
    <AppNavbarListing title="Projets" />
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>

</style>
