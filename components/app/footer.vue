<script setup lang="ts">

</script>

<template>
  <footer class="footer content-crt">
    <NuxtLink class="footer-logo" to="/portfolio2026/pages/projects">
      <img src="/logo.svg" alt="retour à l'accueil">
    </NuxtLink>
    <div class="footer-content">
      <p> Louis Le Doussal 2026 </p>
      <p> - </p>
      <NuxtLink class="footer-link" to="/mentions-legales">
        Mentions légales
      </NuxtLink>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 3px solid $primary;
  padding-block: 16px;
  margin-top: auto;
  gap: 18px;
}

.footer-content {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  font-family: $font-family-VT323;
  font-size: fluid(12px, 24px, 393px, 1200px);
  color: $primary;
}

.footer-link {
  text-decoration: underline;
}

.footer-logo {
  width: 80px;

  @include mq($from tablet) {
    display: none;
  }
}
</style>
