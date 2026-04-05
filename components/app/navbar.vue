<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<template>
  <header class="header content-crt">
    <div class="drawer drawer-end">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle">
      <div class="drawer-content flex flex-col">
        <div class="navbar w-full">
          <div class="mx-2 flex-1 px-2">
            <h1 class="h1">
              {{ title }}
            </h1>
          </div>
          <div class="hidden flex-none lg:block">
            <ul class="menu menu-horizontal">
              <NuxtLink to="/projects">
                <img class="logo-navbar" src="/logo.svg">
              </NuxtLink>
            </ul>
          </div>
        </div>
        <div class="flex-none lg:hidden">
          <label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <img src="/menu-burger.svg" alt="Open the navigation">
          </label>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay" />
        <ul class="menu min-h-full w-80 p-4 ">
          <li class="title-burger">
            Projets
          </li>
          <li>
            <NuxtLink to="/projects/affilae" class="link-burger">
              Affilae
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects/espace-qg" class="link-burger">
              Espace QG
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects/geneasphere" class="link-burger">
              GeneaSphere
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects/golf-de-lhippodrome" class="link-burger">
              Golf de l'hippodrome
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects/musba" class="link-burger">
              Musba
            </NuxtLink>
          </li>
          <li class="profile">
            <NuxtLink class="navbar-profile">
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
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.drawer-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header {
  width: 100%;
  padding-block: fluid(27px, 44px, 393px, 1200px) 44px;
  border-bottom: 3px solid $primary;
  color: $primary;
  font-size: $font-size-title-h1;
  font-family: $font-family-Input;
  font-weight: 700;
}

.title-burger {
  font-family: $font-family-Input;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 48px;
}

.menu-burger {
  width: 50px;
}

.link-burger {
  display: flex;
  width: 212px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 3px solid $primary;
  font-family: $font-family-Input;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: unset;
  border-radius: unset;
  margin-bottom: 32px;

  &.router-link-active {
    background: $primary;
    color: black;
  }
}

.menu {
  background: black;

  @include mq($until desktop) {
    border-left: 3px solid $primary;
    padding: 43px 24px;
  }
}

.navbar {
  border: 4px solid $primary;
  max-width: 70%;
  margin-right: 38px;
  position: relative;

  @include mq($until desktop) {
    border-left: unset;
  }

  @include mq($from desktop) {
    max-width: 90%;
    margin-inline: auto;
    border: 3px solid $primary;
    border-right: unset;
  }
}

li {
  padding: unset;
  border-radius: unset;
}

.logo-navbar {
  height: 105px;
  position: absolute;
  right: -24px;
  top: -20px;
}

.profile {
  margin-top: auto;
}

.navbar-profile {
  display: flex;
  flex-direction: row;
  border: 3px solid $primary;
  width: 220px;
  padding: unset;
  border-radius: unset;

  .profile-picture {
    width: 65px;
    height: 100%;
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    padding: 12px;

    .profile-information {
      font-family: $font-family-VT323;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .profile-main-information {
      font-family: $font-family-VT323;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
