<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<template>
  <header class="header content-crt">
    <div class="drawer drawer-end">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle">
      <div class="navbar w-full">
        <div class="profile-title mx-2 flex-1 px-2">
          <div class="profile-mobile">
            <AppProfile />
          </div>
          <h1 class="h1">
            {{ title }}
          </h1>
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <AppProfile />
          </ul>
        </div>
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
  color: $primary;
  font-size: $font-size-title-h1;
  font-family: $font-family-Input;
  font-weight: 700;
  padding-bottom: fluid(0px, 27px, 375px, 393px);
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
}

.menu {
  @include mq($until tablet) {
    border-left: 3px solid $primary;
    padding: 43px 24px;
  }
}

.navbar {
  margin-right: 38px;
  position: relative;

  @include mq($from tablet) {
    max-width: 90%;
    margin-inline: auto;
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

.profile-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-inline: auto;
  gap: fluid(24px, 48px, 393px, 1200px);

  @include mq($from desktop) {
    gap: unset;
    justify-content: unset;
    margin-inline: unset;
    align-items: unset;
  }
}

.profile-mobile {
  @include mq($from desktop) {
    display: none;
  }
}
</style>
