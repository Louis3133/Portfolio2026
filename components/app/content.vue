<script setup lang="ts">
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { onMounted } from "vue";

defineProps<{
  brief: string;
  projectLink: string;
  technos: string[];
  informations: InfoItem[];
  members: Member[];
  projects: Project[];
  intentions: string;
  titleImage1?: string;
  image1?: string;
  titleImage2?: string;
  image2?: string;
}>();

gsap.registerPlugin(Draggable);

const PIXEL_SIZE = 8;

function drawPixelated(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width;
  const h = canvas.height;

  const small = Math.max(1, Math.round(w / PIXEL_SIZE));
  const smallH = Math.max(1, Math.round(h / PIXEL_SIZE));

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, small, smallH);
  ctx.drawImage(canvas, 0, 0, small, smallH, 0, 0, w, h);
}

function initPixelCanvas(canvas: HTMLCanvasElement, src: string) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    canvas.width = canvas.offsetWidth || 500;
    canvas.height = canvas.offsetHeight || 265;
    drawPixelated(canvas, img);
  };
  img.src = src;
}

onMounted(() => {
  const buttonImage1 = document.getElementById("image-1-button");
  const buttonImage2 = document.getElementById("image-2-button");
  const containerImage1 = document.getElementById("image-1-container");
  const containerImage2 = document.getElementById("image-2-container");

  buttonImage1?.addEventListener("click", () => {
    containerImage1.style.opacity = "0";
  });

  buttonImage2?.addEventListener("click", () => {
    containerImage2.style.opacity = "0";
  });

  Draggable.create(".image-item", {
    bounds: ".main-content",
  });

  document.querySelectorAll<HTMLCanvasElement>(".image-canvas").forEach((canvas) => {
    const src = canvas.dataset.src!;
    initPixelCanvas(canvas, src);
  });
});
type Member = {
  gender: string;
  firstname: string;
  lastname: string;
  job: string;
};

type Project = {
  type: string;
  title: string;
  description: string;
};

type InfoItem = {
  text: string;
  link: string;
};
</script>

<template>
  <section id="main-content" class="main-content content-crt">
    <div class="content-container">
      <div class="content-text">
        <div v-if="brief" class="brief">
          <h2>Brief du projet :</h2>
          <div class="content-brief">
            <p v-html="brief" />
            <a v-if="projectLink" target="_blank" class="project-link" :href="projectLink">Explorer le projet</a>
          </div>
        </div>

        <div v-if="technos" class="technos">
          <h2>Technos utilisées :</h2>
          <ul>
            <li v-for="techno in technos" :key="techno">
              {{ techno }}
            </li>
          </ul>
        </div>

        <div class="infos">
          <h2>Infos du projet</h2>
          <ul>
            <li v-for="information in informations" :key="information.link">
              <a target="_blank" :href="information.link">
                {{ information.text }}
              </a>
            </li>
            <li v-if="members">
              <button class="infos-button-team team-modal" onclick="my_modal_3.showModal()">
                Equipe du projet
              </button>
              <dialog id="my_modal_3" class="modal">
                <div class="modal-box content-crt">
                  <form method="dialog">
                    <button class="button-close-desktop">
                      Fermer <img src="/close.svg" alt="Close the modal">
                    </button>
                    <button class="button-close-mobile">
                      <img src="/close.svg" alt="Close the modal">
                    </button>
                  </form>
                  <AppTeam
                    :members="members"
                    :projects="projects"
                  />
                </div>
              </dialog>
            </li>
          </ul>
        </div>

        <div v-if="intentions" class="brief">
          <h2>Parti-pris & intentions</h2>
          <div class="content-brief">
            <p v-html="intentions" />
          </div>
        </div>
      </div>

      <div v-if="image1 || image2" class="images">
        <div v-if="image1" id="image-1-container" class="image-item image-1">
          <div class="image-nav">
            <p v-if="titleImage1">
              {{ titleImage1 }}
            </p>
            <button id="image-1-button" class="button-close-img">
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                <rect width="5.44975" height="0.427431" transform="matrix(0.707643 0.706571 0.706571 -0.707643 0 0.304286)" fill="#1E1E1E" />
                <rect width="5.44975" height="0.427431" transform="matrix(0.706901 -0.707312 -0.707312 -0.706901 0.303955 4.15682)" fill="#1E1E1E" />
              </svg>
            </button>
          </div>
          <div class="image-wrapper">
            <img :src="image1" class="image-content">
            <canvas class="image-canvas" :data-src="image1" />
          </div>
        </div>

        <div v-if="image2" id="image-2-container" class="image-item image-2">
          <div class="image-nav">
            <p v-if="titleImage2">
              {{ titleImage2 }}
            </p>
            <button id="image-2-button" class="button-close-img">
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                <rect width="5.44975" height="0.427431" transform="matrix(0.707643 0.706571 0.706571 -0.707643 0 0.304286)" fill="#1E1E1E" />
                <rect width="5.44975" height="0.427431" transform="matrix(0.706901 -0.707312 -0.707312 -0.706901 0.303955 4.15682)" fill="#1E1E1E" />
              </svg>
            </button>
          </div>
          <div class="image-wrapper">
            <img :src="image2" class="image-content">
            <canvas class="image-canvas" :data-src="image2" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.button-close-img {
  border-top: 4px solid #fff;
  border-left: 4px solid #fff;
  background: #ededed;
  cursor: pointer;

  svg {
    width: 15px;
    height: 14px;
    flex-shrink: 0;
  }
}

.image-item.image-1 {
  position: absolute;
  top: 25%;
  right: 25%;
}

.image-item.image-2 {
  position: absolute;
  top: 38%;
  right: 15%;
}

.image-item {
  background: #dad3d3;
  border: 5px solid black;
  padding: 5px;
  width: fluid(200px, 500px, 393px, 1500px);
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: 0.2s ease;

  .image-nav {
    background: black;
    color: #fff;
    font-family: $font-family-VT323;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.42px;
    display: flex;
    flex-direction: row;
    padding: 8px;
    justify-content: space-between;
    text-shadow: 0 0 3px white;
  }
}

.image-wrapper {
  overflow: hidden;
  height: 265px;
  width: 100%;
  position: relative;
}

.image-content {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.image-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  opacity: 1;
  pointer-events: none;
}

@keyframes neon-flicker {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.image-item:hover .image-canvas {
  animation: neon-flicker 0.6s ease-out forwards;
}

.main-content {
  height: 100%;
  padding-block: fluid(26px, 62px, 393px, 1200px);
  color: $primary;
  font-size: $font-size-text;
  font-weight: 400;
  font-family: $font-family-Input;
  position: relative;
}

.content-container {
  max-width: 90%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @include mq($from desktop) {
    flex-direction: row;
  }
}

.images {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @include mq($from desktop) {
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    height: 100vh;
  }
}

.modal-box {
  padding: unset;
  border-radius: unset;
  height: 90%;
  width: 95%;
  max-width: unset;
  background: black;
  color: white;
}

.button-close-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  height: 34px;
  width: 34px;
  margin-left: auto;
  cursor: pointer;

  @include mq($from tablet) {
    display: none;
  }
}

.infos-button-team {
  cursor: pointer;
}

.team-modal {
  text-decoration: underline;
}

.button-close-desktop {
  padding: 12px 24px;
  color: black;
  background: white;
  display: none;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
  font-family: $font-family-Input;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: auto;
  cursor: pointer;

  @include mq($from tablet) {
    display: flex;
  }
}

.content-text {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @include mq($from desktop) {
    max-width: 50%;
    margin-bottom: 64px;
  }
}

h2 {
  font-size: $font-size-title-h2;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: $font-family-Input;
}

.project-link {
  font-weight: 700;
  width: fit-content;
}

.brief,
.content-brief,
.technos,
.infos {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

a {
  text-decoration: underline;
}

ul {
  list-style: inside;
}
</style>
