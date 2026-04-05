<script setup lang="ts">

</script>

<template>
  <NuxtLink to="/curriculum" class="navbar-profile">
    <div class="profile-text">
      <p class="profile-information">
        Connecté en tant que
      </p>
      <p class="profile-main-information">
        Louis Le Doussal
      </p>
      <p class="profile-information">
        Accéder au profil (CV)
      </p>
    </div>
    <img class="profile-picture" src="/louis-le-doussal.webp" alt="Louis Le Doussal">
  </NuxtLink>
</template>

<style lang="scss" scoped>
.navbar-profile {
  display: flex;
  flex-direction: row;
  border: 3px solid $primary;
  padding: unset;
  border-radius: unset;
  width: fit-content;

  .profile-picture {
    width: fluid(65px, 92px, 393px, 1200px);
    height: 100%;
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    padding: 12px;

    .profile-information {
      font-family: $font-family-VT323;
      font-size: fluid(12px, 18px, 393px, 1200px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .profile-main-information {
      font-family: $font-family-VT323;
      font-size: fluid(18px, 32px, 393px, 1200px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
