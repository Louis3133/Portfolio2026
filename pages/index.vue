<script setup lang="ts">
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

gsap.registerPlugin(MorphSVGPlugin);

const MORPH_DURATION = 1.8; // ← était 3
const LINES_DURATION = 0.8; // ← était 1
const TEXT_DURATION = 0.8;

const router = useRouter();
const progress = ref(0);
const isReady = ref(false);
const isWrapperVisible = ref(false);

const ROUTES = [
  "/projects",
  "/Curriculum",
  "/projects/affilae",
  "/projects/espaceqg",
  "/projects/geneasphere",
  "/projects/golfdelhippodrome",
  "/projects/musba",
];

async function preloadAll() {
  const total = ROUTES.length;
  let loaded = 0;

  const tick = () => {
    loaded++;
    progress.value = Math.round((loaded / total) * 100);
  };

  await Promise.all(
    ROUTES.map(route =>
      fetch(route, { method: "GET", priority: "low" } as RequestInit)
        .catch(() => null)
        .finally(tick),
    ),
  );
}

function tryShowComplete() {
  if (!isWrapperVisible.value || progress.value < 100)
    return;
  isReady.value = true;

  gsap.to(".progress-bar-fill", {
    width: "100%",
    ease: "power2.out",
    duration: 0.4,
    onComplete: () => {
      gsap.to(".enter-hint", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
  });
}

function handleEnter() {
  if (!isReady.value)
    return;
  gsap.to(".loading-section", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => router.push("/projects"),
  });
}

onMounted(() => {
  preloadAll().then(() => {
    progress.value = 100;
    tryShowComplete();
  });

  watch(progress, (val) => {
    if (isReady.value)
      return;
    gsap.to(".progress-bar-fill", {
      width: `${val}%`,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const hLines = document.querySelectorAll("#horizontal_lines path");
  hLines.forEach((el) => {
    const length = (el as SVGPathElement).getTotalLength();
    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: -length,
    });
  });

  const lineIds = ["#line_6", "#line_5", "#line_4", "#line_3", "#line_2", "#line_1"];
  gsap.set("#moving_lines", { visibility: "visible" });
  gsap.set(lineIds, { opacity: 0 });

  gsap.to(lineIds, {
    opacity: 1,
    duration: 0.3, // ← était 0.4
    stagger: 0.08, // ← était 0.15
    ease: "power2.inOut",
  });

  const morphTweens = [2, 3, 4, 5, 6].map((idx) => {
    const sourceEl = document.querySelector(`#line_${idx}`);
    const targetEl = document.querySelector(`#line_${idx - 1}`);
    return gsap.to(sourceEl, {
      duration: MORPH_DURATION,
      ease: "none",
      repeat: -1,
      morphSVG: targetEl,
    });
  });

  gsap.delayedCall(MORPH_DURATION, () => {
    const tl = gsap.timeline();

    tl.set("#horizontal_lines", { visibility: "visible" })
      .to("#horizontal_lines path", {
        strokeDashoffset: 0,
        duration: LINES_DURATION,
        ease: "power2.inOut",
        stagger: 0.1, // ← était 0.15
      })
      .call(() => {
        morphTweens.forEach((t) => {
          const elapsed = t.time() % MORPH_DURATION;
          const remaining = elapsed === 0 ? 0 : MORPH_DURATION - elapsed;
          gsap.delayedCall(remaining, () => t.repeat(0));
        });
      })
      .to("#text", {
        visibility: "visible",
        opacity: 1,
        duration: TEXT_DURATION,
        ease: "power2.inOut",
      }, `+=0.1`)
      .to(".progress-wrapper", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          isWrapperVisible.value = true;
          gsap.set(".progress-bar-fill", { width: `${progress.value}%` });
          tryShowComplete();
        },
      });
  });
});

definePageMeta({
  layout: "loading",
});
</script>

<template>
  <section
    class="loading-section content-crt"
    :class="{ 'is-ready': isReady }"
    @click="handleEnter"
  >
    <div class="containerc container-svg">
      <div class="container__inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="1515.29" height="779" viewBox="0 0 1515.29 779">
          <filter id="filter">
            <feDropShadow stdDeviation="10 10" in="SourceGraphic" dx="0" dy="0" flood-color="#80d4b2" flood-opacity="0.7" x="0%" y="0%" width="100%" height="100%" result="dropShadow" />
          </filter>

          <g filter="url(#filter)">
            <g id="outline_oval" fill="none" stroke="currentColor" stroke-miterlimit="10">
              <ellipse cx="757.64" cy="389.5" rx="716.23" ry="362.15" stroke-width="19" />
            </g>

            <g id="horizontal_lines" fill="none" stroke="currentColor" stroke-miterlimit="10" style="visibility: hidden;">
              <path stroke-width="20" d="M1333.33 605H181.96" />
              <path stroke-width="20" d="M1333.33 174H181.96" />
            </g>

            <g id="moving_lines" mask="url(#moving_lines_mask)" style="visibility: hidden;">
              <path id="line_1" d="M757.64 27.35c-395.56 0-716.23 162.14-716.23 362.15s320.67 362.15 716.23 362.15" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="19" />
              <path id="line_6" d="M757.64 751.65c395.57 0 716.23-162.14 716.23-362.15S1153.21 27.35 757.64 27.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="19" />
              <path id="line_5" d="M757.64 751.65c251.66 0 455.68-162.14 455.68-362.15S1009.3 27.35 757.64 27.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="19" />
              <path id="line_4" d="M757.64 751.65c88.74 0 160.68-162.14 160.68-362.15S846.38 27.35 757.64 27.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="19" />
              <path id="line_3" d="M757.64 27.35C668.91 27.35 597 189.49 597 389.5s71.94 362.15 160.67 362.15" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="19" />
              <path id="line_2" d="M757.64 27.35C506 27.35 302 189.49 302 389.5s204 362.15 455.64 362.15" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="19" />
            </g>

            <g
              id="text"
              style="visibility: hidden; opacity: 0;"
              transform="translate(94.79, 61.4) scale(1.902)"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M222.472 153.877C222.472 145.636 229.117 138.955 237.314 138.955H301.919C310.116 138.955 316.761 145.636 316.761 153.877V192.498C316.761 200.739 310.116 207.42 301.919 207.42H237.314C229.117 207.42 222.472 200.739 222.472 192.498V153.877ZM253.901 179.812C253.901 177.144 254.594 174.522 255.912 172.206L267.914 151.109C268.757 149.626 270.889 149.639 271.715 151.132L283.4 172.25C284.666 174.539 285.331 177.115 285.331 179.735C285.331 188.238 278.475 195.131 270.017 195.131H269.138C260.723 195.131 253.901 188.272 253.901 179.812Z" fill="currentColor" />
              <path d="M337.52 139.394H353.671V188.548C353.671 191.456 356.016 193.814 358.91 193.814H410.856C413.749 193.814 416.094 191.456 416.094 188.548V139.394H432.245V193.814C432.245 201.328 426.187 207.419 418.713 207.419H352.362C344.165 207.419 337.52 200.739 337.52 192.498V139.394Z" fill="currentColor" />
              <path d="M128.348 139.394H112.197V207.42H196.446V193.814H128.348V139.394Z" fill="currentColor" />
              <path d="M473.41 138.077H457.258V206.103H473.41V192.498V138.077Z" fill="currentColor" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M585.298 195.927V200.149V205.713C585.298 206.305 584.815 206.784 584.223 206.778L498 206.018V195.927H570.415V178.887C570.415 178.299 569.94 177.823 569.353 177.821L499.062 177.567C498.475 177.565 498 177.089 498 176.501V170.584V156.029V145.524H508.862V148.861H519.724H530.587H541.449H552.311L584.898 148.676V138H519.724H500.132C498.954 138 498 138.954 498 140.132V145.524H508.862V148.861V157.08V165.897C508.862 166.486 509.339 166.963 509.928 166.963H545.07H578.902C582.435 166.963 585.298 169.827 585.298 173.359V174.204V195.927Z" fill="currentColor" />
            </g>
          </g>

          <mask id="moving_lines_mask">
            <rect fill="#fff" width="1515.29" height="779" />
            <rect fill="#000" x="0" y="266.14" width="1515.29" height="246.71" />
          </mask>
        </svg>
      </div>
    </div>

    <div class="progress-wrapper">
      <div class="progress-bar">
        <div class="progress-bar-fill" />
      </div>
      <p class="enter-hint">
        [ cliquer pour entrer ]
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container-svg {
  width: fluid(290px, 700px, 393px, 1200px);
}

.container__inner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 51.419142%;
  color: $primary;

  > svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 164px;
  justify-content: center;
  margin-block: auto;
  height: 100%;
  color: $primary;
  cursor: default;

  &.is-ready {
    cursor: pointer;
  }

  .loading-logo {
    width: fluid(290px, 700px, 393px, 1200px);
  }

  .loading-text {
    text-align: center;
    font-family: $font-family-Input;
    font-size: fluid(20px, 28px, 393px, 1200px);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}

.progress-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  opacity: 0;
  width: fluid(290px, 700px, 393px, 1200px);
}

.progress-bar {
  width: 100%;
  height: 2px;
  background: rgba($primary, 0.2);
  position: relative;
  overflow: hidden;
}

.progress-bar-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  background: currentColor;
}

.enter-hint {
  opacity: 0;
  font-family: $font-family-Input;
  font-size: fluid(14px, 18px, 393px, 1200px);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-align: center;
  cursor: pointer;
}
</style>
