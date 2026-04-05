<script setup lang="ts">
const {
  isAffilaeOpen,
  affilaeDone,
  affilaeTotal,
  affilaeCount,
  isEspaceQGOpen,
  EspaceQGDone,
  EspaceQGTotal,
  EspaceQGCount,
  isGeneaSphereOpen,
  GeneaSphereDone,
  GeneaSphereTotal,
  GeneaSphereCount,
  isGolfOpen,
  GolfDone,
  GolfTotal,
  GolfCount,
  isMusbaOpen,
  MusbaDone,
  MusbaTotal,
  MusbaCount,
} = useNavigation();

const affilaePercentage = computed(() => {
  if (!affilaeTotal.value || affilaeTotal.value === 0)
    return 0;
  const percent = (affilaeCount.value / affilaeTotal.value) * 100;
  return Math.min(percent, 100);
});

const EspaceQGPercentage = computed(() => {
  if (!EspaceQGTotal.value || EspaceQGTotal.value === 0)
    return 0;
  const percent = (EspaceQGCount.value / EspaceQGTotal.value) * 100;
  return Math.min(percent, 100);
});

const GeneaSpherePercentage = computed(() => {
  if (!GeneaSphereTotal.value || GeneaSphereTotal.value === 0)
    return 0;
  const percent = (GeneaSphereCount.value / GeneaSphereTotal.value) * 100;
  return Math.min(percent, 100);
});

const GolfPercentage = computed(() => {
  if (!GolfTotal.value || GolfTotal.value === 0)
    return 0;
  const percent = (GolfCount.value / GolfTotal.value) * 100;
  return Math.min(percent, 100);
});

const MusbaPercentage = computed(() => {
  if (!MusbaTotal.value || MusbaTotal.value === 0)
    return 0;
  const percent = (MusbaCount.value / MusbaTotal.value) * 100;
  return Math.min(percent, 100);
});
</script>

<template>
  <section id="menu" class="navigation-content content-crt">
    <div class="navigation-container">
      <div class="stats-hover" :class="{ 'is-open': isAffilaeOpen }">
        <div class="stats-wrapper">
          <div v-if="!affilaeDone" class="navigation-item-stats">
            <p class="stats-project-name">
              Affilae
            </p>
            <div class="stats-progressions">
              <div class="stats stats-blue php-affilae">
                <p class="type">
                  PHP
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-pink scss-affilae">
                <p class="type">
                  SCSS
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-yellow js-affilae">
                <p class="type">
                  JS
                </p>
                <div class="stats-progression-bar" />
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-item box">
          <div class="box-flap box-flap-left" />
          <div class="box-flap box-flap-right" />
          <div class="box-back" />
          <NuxtLink to="/projects/affilae" class="navigation-link">
            Affilae
          </NuxtLink>
          <div class="navigation-progression nav-progression-affilae" :style="{ '--progress': `${affilaePercentage}%` }" />
        </div>
      </div>

      <div class="stats-hover" :class="{ 'is-open': isEspaceQGOpen }">
        <div class="stats-wrapper">
          <div v-if="!EspaceQGDone" class="navigation-item-stats">
            <p class="stats-project-name">
              Espace QG
            </p>
            <div class="stats-progressions">
              <div class="stats stats-blue php-espace-qg">
                <p class="type">
                  PHP
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-pink scss-espace-qg">
                <p class="type">
                  SCSS
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-yellow js-espace-qg">
                <p class="type">
                  JS
                </p>
                <div class="stats-progression-bar" />
              </div>
            </div>
          </div>
        </div>

        <div class="navigation-item box">
          <div class="box-flap box-flap-left" />
          <div class="box-flap box-flap-right" />
          <div class="box-back" />
          <NuxtLink to="/projects/espace-qg" class="navigation-link">
            Espace QG
          </NuxtLink>
          <div class="navigation-progression nav-progression-espace-qg" :style="{ '--progress': `${EspaceQGPercentage}%` }" />
        </div>
      </div>

      <div class="stats-hover" :class="{ 'is-open': isGeneaSphereOpen }">
        <div class="stats-wrapper">
          <div v-if="!GeneaSphereDone" class="navigation-item-stats">
            <p class="stats-project-name">
              GeneaSphere
            </p>
            <div class="stats-progressions">
              <div class="stats stats-green vue-geneasphere">
                <p class="type">
                  Nuxt
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-blue ts-geneasphere">
                <p class="type">
                  TS
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-purple threejs-geneasphere">
                <p class="type">
                  ThreeJS
                </p>
                <div class="stats-progression-bar" />
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-item box">
          <div class="box-flap box-flap-left" />
          <div class="box-flap box-flap-right" />
          <div class="box-back" />
          <NuxtLink to="/projects/geneasphere" class="navigation-link">
            GeneaSphere
          </NuxtLink>
          <div class="navigation-progression nav-progression-geneasphere" :style="{ '--progress': `${GeneaSpherePercentage}%` }" />
        </div>
      </div>

      <div class="stats-hover" :class="{ 'is-open': isGolfOpen }">
        <div class="stats-wrapper">
          <div v-if="!GolfDone" class="navigation-item-stats">
            <p class="stats-project-name">
              Golf de l'hippodrome
            </p>
            <div class="stats-progressions">
              <div class="stats stats-blue php-golf">
                <p class="type">
                  PHP
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-pink scss-golf">
                <p class="type">
                  SCSS
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-yellow js-golf">
                <p class="type">
                  JS
                </p>
                <div class="stats-progression-bar" />
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-item box">
          <div class="box-flap box-flap-left" />
          <div class="box-flap box-flap-right" />
          <div class="box-back" />
          <NuxtLink to="/projects/golf-de-lhippodrome" class="navigation-link">
            Golf de l'hippodrome
          </NuxtLink>
          <div class="navigation-progression nav-progression-golf" :style="{ '--progress': `${GolfPercentage}%` }" />
        </div>
      </div>

      <div class="stats-hover" :class="{ 'is-open': isMusbaOpen }">
        <div class="stats-wrapper">
          <div v-if="!MusbaDone" class="navigation-item-stats">
            <p class="stats-project-name">
              Musba
            </p>
            <div class="stats-progressions">
              <div class="stats stats-green vue-musba">
                <p class="type">
                  Vue
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-pink scss-musba">
                <p class="type">
                  SCSS
                </p>
                <div class="stats-progression-bar" />
              </div>
              <div class="stats stats-purple threejs-musba">
                <p class="type">
                  ThreeJS
                </p>
                <div class="stats-progression-bar" />
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-item box">
          <div class="box-flap box-flap-left" />
          <div class="box-flap box-flap-right" />
          <div class="box-back" />
          <NuxtLink to="/projects/musba" class="navigation-link">
            Musba
          </NuxtLink>
          <div class="navigation-progression nav-progression-musba" :style="{ '--progress': `${MusbaPercentage}%` }" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$flap-duration: 0.35s;
$stats-duration: 0.4s;
$flap-delay-in: 0s;
$stats-delay-in: 0.35s;
$stats-delay-out: 0s;
$flap-delay-out: 0.4s;

.stats {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;

  .stats-progression-bar {
    height: 18px;
  }

  .type {
    width: 60px;
  }

  &.stats-green {
    color: $green-100;
    .stats-progression-bar {
      border: 2px solid $green-100;
      width: 112px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 16px;
        background: $green-100;
      }
    }
  }

  &.stats-yellow {
    color: $yellow-100;
    .stats-progression-bar {
      border: 2px solid $yellow-100;
      width: 112px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 16px;
        background: $yellow-100;
      }
    }
  }

  &.stats-purple {
    color: #a602a6;
    .stats-progression-bar {
      border: 2px solid #a602a6;
      width: 112px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 16px;
        background: #a602a6;
      }
    }
  }

  &.stats-pink {
    color: $pink-100;
    .stats-progression-bar {
      border: 2px solid $pink-100;
      width: 112px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 16px;
        background: $pink-100;
      }
    }
  }

  &.stats-blue {
    color: $blue-200;
    .stats-progression-bar {
      border: 2px solid $blue-200;
      width: 112px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 16px;
        background: $blue-200;
      }
    }
  }
}

.stats-wrapper {
  position: absolute;
  bottom: 100%;
  left: 0;
  overflow: hidden;
  padding-top: 20px;
  pointer-events: none;
  width: 200px;
}

.navigation-item-stats {
  display: flex;
  width: 200px;
  flex-direction: column;
  padding: 8px 8px 16px 8px;
  border: 3px solid $primary;
  gap: 8px;
  background: black;
  pointer-events: all;
  transform: translateY(100%);
  transition: transform $stats-duration ease $stats-delay-out;
  min-height: 200px;
}

.stats-progressions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stats-project-name {
  border: 3px solid $primary;
  font-family: $font-family-Input;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 8px;
}

.navigation-content {
  display: none;
  color: $primary;

  @include mq($from desktop) {
    display: flex;
    width: 100%;
    border-top: 3px solid $primary;
    padding-block: 24px;
  }
}

.navigation-container {
  max-width: 90%;
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.stats-hover {
  position: relative;
}

.navigation-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;

  .navigation-link {
    width: 200px;
    height: 50px;
    border: 3px solid $primary;
    color: #93eef3;
    font-family: $font-family-Input;
    font-size: 20px;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    padding: 4px;
    padding-top: 8px;

    &.router-link-active {
      background: $primary;
      color: black;
    }
  }

  .navigation-progression {
    width: 200px;
    height: 40px;
    border: 3px solid $primary;
    position: relative;
  }
}

.box {
  position: relative;
}

.box-flap {
  position: absolute;
  z-index: 1;
  top: 0;
  width: 50%;
  transition: transform $flap-duration ease $flap-delay-out;

  &::before {
    content: "";
    display: block;
    border: 2px solid $primary;
    border-left-width: 3px;
    border-right-width: 3px;
    height: 2px;
    width: 100%;
    transform-origin: left top;
    box-sizing: border-box;
    transition: height $flap-duration ease $flap-delay-out;
  }
}

.box-flap-left {
  transform-origin: left top;
  left: 0;
  &::before {
    transform: skew(50deg);
  }
}

.box-flap-right {
  transform-origin: right top;
  right: 0;
  &::before {
    transform: skew(-50deg);
  }
}

.box-back {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 2px;
  background: $primary;
  transform: translateY(0);
  transition: transform $flap-duration ease $flap-delay-out;
}

.stats-hover.is-open {
  .navigation-item-stats {
    opacity: 0;
    pointer-events: none;
  }
}

.stats-hover:hover,
.stats-hover.is-open {
  .box-flap {
    transition-delay: $flap-delay-in;
    &::before {
      height: 10px;
      transition-delay: $flap-delay-in;
    }
  }

  .box-flap-left {
    transform: rotate(-130deg);
  }
  .box-flap-right {
    transform: rotate(130deg);
  }

  .box-back {
    transform: translateY(-15px);
    transition-delay: $flap-delay-in;
  }

  .navigation-item-stats {
    transform: translateY(0);
    transition-delay: $stats-delay-in;
  }
}

.stats-blue.php-espace-qg .stats-progression-bar,
.stats-blue.php-affilae .stats-progression-bar,
.stats-blue.php-golf .stats-progression-bar {
  &::after {
    width: 40%;
  }
}

.stats-pink.scss-espace-qg .stats-progression-bar,
.stats-pink.scss-affilae .stats-progression-bar,
.stats-pink.scss-golf .stats-progression-bar {
  &::after {
    width: 50%;
  }
}

.stats-yellow.js-espace-qg .stats-progression-bar,
.stats-yellow.js-affilae .stats-progression-bar,
.stats-yellow.js-golf .stats-progression-bar {
  &::after {
    width: 10%;
  }
}

.stats-green.vue-musba .stats-progression-bar {
  &::after {
    width: 60%;
  }
}

.stats-purple.threejs-musba .stats-progression-bar {
  &::after {
    width: 30%;
  }
}

.stats-pink.scss-musba .stats-progression-bar {
  &::after {
    width: 10%;
  }
}

.stats-green.vue-geneasphere .stats-progression-bar {
  &::after {
    width: 60%;
  }
}

.stats-blue.ts-geneasphere .stats-progression-bar {
  &::after {
    width: 20%;
  }
}

.stats-purple.threejs-geneasphere .stats-progression-bar {
  &::after {
    width: 20%;
  }
}

.nav-progression-affilae,
.nav-progression-espace-qg,
.nav-progression-geneasphere,
.nav-progression-golf,
.nav-progression-musba {
  &::before {
    content: "";
    height: 100%; // Prend toute la hauteur de .navigation-progression (40px)

    // On utilise la variable injectée par Vue !
    width: var(--progress, 0%);

    background: $primary;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: width 0.2s ease-out; // Pour que la barre glisse fluidement
    z-index: 1;
  }
}
</style>
