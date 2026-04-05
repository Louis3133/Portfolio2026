<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const items = [
  { label: "A", slug: "affilae", text: "Affilae", to: "/projects/affilae", tabLeft: 0 },
  { label: "E", slug: "espace-qg", text: "Espace QG", to: "/projects/espace-qg", tabLeft: 50 },
  { label: "G", slug: "geneasphere", text: "Geneasphere", to: "/projects/geneasphere", tabLeft: 100 },
  { label: "", slug: "golf", text: "Golf de l'hippodrome", to: "/projects/golf-de-lhippodrome", tabLeft: null },
  { label: "M", slug: "musba", text: "Musba", to: "/projects/musba", tabLeft: 150 },
];

const TICK_H = 10;
const TICK_GAP = 7;
const STEP = TICK_H + TICK_GAP;
const N_TICKS = 9;
const WHEEL_H = N_TICKS * STEP - TICK_GAP;
const CENTER_Y = WHEEL_H / 2;

const tickPositions = ref<number[]>(
  Array.from({ length: N_TICKS }, (_, i) => i * STEP),
);

const tickStyles = computed(() =>
  tickPositions.value.map((y) => {
    const dist = y + TICK_H / 2 - CENTER_Y;
    const norm = dist / CENTER_Y;
    const angle = norm * (Math.PI / 2);
    const scaleY = Math.max(0.04, Math.cos(angle));
    const opacity = Math.max(0.06, Math.cos(angle) ** 1.8);
    return { transform: `scaleY(${scaleY})`, opacity };
  }),
);

function moveTicks(direction: 1 | -1) {
  tickPositions.value = tickPositions.value.map((y) => {
    let next = y + direction * STEP;
    if (next < 0)
      next += WHEEL_H + TICK_GAP;
    if (next >= WHEEL_H + TICK_GAP)
      next -= WHEEL_H + TICK_GAP;
    return next;
  });
}

const savedIndex = Number.parseInt(sessionStorage.getItem("listing-current") ?? "0");
const current = ref(Math.min(savedIndex, items.length - 1));
const animatingIndex = ref<number | null>(null);

let cooldown = false;
function throttle(fn: () => void) {
  if (cooldown)
    return;
  cooldown = true;
  setTimeout(() => (cooldown = false), 700);
  fn();
}

function flipNext() {
  if (current.value < items.length - 1) {
    const flipping = current.value;
    animatingIndex.value = flipping;
    current.value++;
    moveTicks(1); // molette descend
    sessionStorage.setItem("listing-current", String(current.value));
    setTimeout(() => {
      if (animatingIndex.value === flipping)
        animatingIndex.value = null;
    }, 650);
  }
}

function flipPrev() {
  if (current.value > 0) {
    animatingIndex.value = null;
    current.value--;
    moveTicks(-1); // molette remonte
    sessionStorage.setItem("listing-current", String(current.value));
  }
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  throttle(() => e.deltaY > 0 ? flipNext() : flipPrev());
}

let touchStartY: number | null = null;
function onTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0].clientY;
}
function onTouchEnd(e: TouchEvent) {
  if (touchStartY === null)
    return;
  const dy = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 30)
    throttle(() => dy > 0 ? flipNext() : flipPrev());
  touchStartY = null;
}

onMounted(() => {
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart);
  window.addEventListener("touchend", onTouchEnd);
});
onUnmounted(() => {
  window.removeEventListener("wheel", onWheel);
  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchend", onTouchEnd);
});

function getCardStyle(i: number): Record<string, string> {
  const c = current.value;
  if (i < c) {
    const isAnimating = animatingIndex.value === i;
    return {
      transform: "rotate3d(1,0,0,180deg) translateY(-5%)",
      zIndex: isAnimating ? String(items.length + 20) : String(i),
    };
  }
  if (i === c) {
    return { transform: "rotate3d(1,0,0,0deg)", zIndex: String(items.length + 10) };
  }
  return {
    transform: "rotate3d(1,0,0,0deg)",
    zIndex: String(items.length - (i - c)),
  };
}
</script>

<template>
  <section class="listing-section content-crt">
    <div class="left-scroll">
      <div
        v-for="(style, i) in tickStyles"
        :key="`l-${i}`"
        class="tick"
        :style="{ ...style, top: `${tickPositions[i]}px` }"
      />
    </div>

    <NuxtLink
      v-for="(item, i) in items"
      :key="item.to"
      :to="item.to"
      class="listing-item"
      :class="item.label ? `letter ${item.slug}` : ''"
      :style="getCardStyle(i)"
    >
      <span class="face-front">{{ item.text }}</span>
      <span class="face-back" />
    </NuxtLink>

    <div class="right-scroll">
      <div
        v-for="(style, i) in tickStyles"
        :key="`r-${i}`"
        class="tick"
        :style="{ ...style, top: `${tickPositions[i]}px` }"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.listing-section {
  display: flex;
  margin-block: auto;
  height: 100%;
  color: $primary;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 28vw;
    top: 47%;
    width: 30px;
    height: fluid(22px, 32px, 393px, 1200px);
    border-radius: 0px 0px 72px 72px;
    background: $primary;
    z-index: 999;

    @include mq($from tablet) {
      top: 24%;
    }

    @include mq($from desktop) {
      top: 42.5%;
      left: 41vw;
    }

    @include mq($from extrawide) {
      top: 41.5%;
      left: 41vw;
    }

    @include mq($from 1900px) {
      top: 35%;
      left: 43vw;
    }
  }

  &:after {
    content: "";
    position: absolute;
    right: 28vw;
    top: 47%;
    width: 30px;
    height: fluid(22px, 32px, 393px, 1200px);
    border-radius: 0px 0px 72px 72px;
    background: $primary;
    z-index: 999;

    @include mq($from tablet) {
      top: 24%;
    }

    @include mq($from desktop) {
      top: 42.5%;
      right: 41vw;
    }

    @include mq($from extrawide) {
      top: 41.5%;
      right: 41vw;
    }

    @include mq($from 1900px) {
      top: 35%;
      right: 43vw;
    }
  }
}

.listing-item {
  position: absolute;
  background: black;
  top: 40px;
  border: 4px solid $primary;
  border-radius: 12px;
  height: fluid(140px, 250px, 393px, 1200px);
  width: fluid(225px, 390px, 393px, 1200px);
  justify-content: center;
  display: flex;
  align-items: center;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: $font-family-VT323;
  font-size: fluid(40px, 70px, 393px, 1200px);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transform-origin: bottom center;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}

.face-front {
  backface-visibility: hidden;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.face-back {
  backface-visibility: hidden;
  position: absolute;
  inset: 0;
  transform: rotateX(180deg);
  background: black;
  border-radius: 8px;
}

.letter::after {
  position: absolute;
  top: calc(-1 * fluid(25px, 40px, 393px, 1200px));
  background: $primary;
  color: black;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: $font-family-VT323;
  border: fluid(2px, 4px, 393px, 1200px) solid black;
  border-bottom: solid 4px $primary;
  font-size: fluid(20px, 35px, 393px, 1200px);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  height: fluid(23px, 40px, 393px, 1200px);
  width: fluid(40px, 60px, 393px, 1200px);
  border-radius: 8px 8px 0 0;
}

.letter.affilae::after {
  left: 0px;
  content: "A";
}
.letter.espace-qg::after {
  left: fluid(35px, 50px, 393px, 1200px);
  content: "E";
}
.letter.geneasphere::after {
  left: fluid(70px, 100px, 393px, 1200px);
  content: "G";
}
.letter.musba::after {
  left: fluid(105px, 150px, 393px, 1200px);
  content: "M";
}

.right-scroll,
.left-scroll {
  position: absolute;
  height: 135px;
  width: 35px;
  overflow: hidden;
}

.right-scroll {
  right: 6%;
  top: 20%;

  @include mq($from tablet) {
    right: 20%;
    top: 24%;
  }

  @include mq($from desktop) {
    right: 29%;
    top: 38%;
  }

  @include mq($from wide) {
    right: 29%;
    top: 38%;
  }

  @include mq($from extrawide) {
    right: 32%;
    top: 32%;
  }

  @include mq($from 1900px) {
    right: 35%;
    top: 30%;
  }
}

.left-scroll {
  left: 6%;
  top: 20%;

  @include mq($from tablet) {
    left: 20%;
    top: 24%;
  }

  @include mq($from desktop) {
    left: 29%;
    top: 38%;
  }

  @include mq($from extrawide) {
    left: 32%;
    top: 32%;
  }

  @include mq($from 1900px) {
    left: 35%;
    top: 30%;
  }
}

.tick {
  position: absolute;
  left: 0;
  height: fluid(5px, 10px, 393px, 1200px);
  width: fluid(24px, 35px, 393px, 1200px);
  border-radius: 30px;
  background: $primary;
  transition:
    top 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
