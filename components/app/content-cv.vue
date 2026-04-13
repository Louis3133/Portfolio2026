<script setup lang="ts">
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { onMounted } from "vue";

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
</script>

<template>
  <section id="main-content" class="main-content content-crt">
    <div class="content-container">
      <div class="content-text">
        <div class="brief">
          <div class="content-brief">
            <p>Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie numérique, il est porté à la connaissance des utilisateurs et visiteurs, du site https://louisledoussal.fr, les présentes mentions légales.</p>
            <p>La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</p>
            <a target="_blank" class="cv-link" href="louisledoussal.fr">Accéder au CV (PDF)</a>
          </div>
        </div>

        <div class="brief">
          <h2>Expériences professionnelles</h2>
          <ul class="content-brief">
            <li>
              Intégrateur web en alternance -  <a href="https://www.kaizen-agency.fr/" target="_blank">Kaizen Agency</a> - 2 ans <br>(sept 2024 - sept 2026)
            </li>
            <li>
              Stage de développement web - Mairie de Venerque - 11 semaines <br>(juin 2024)
            </li>
            <li>
              Missions avec les pompiers - Caserne Jacques Vion - <br>(Février - juillet 2022)
            </li>
          </ul>
        </div>

        <div class="brief">
          <h2>Cursus scolaire</h2>
          <ul class="content-brief">
            <li>
              Baccalauréat Général, spécialités Mathématiques, SI et NSI, option ESABAC (Lycée Pierre de Fermat)
            </li>
            <li>
              BUT MMI parcours développement web et dispositifs interactifs <br>(IUT Bordeaux Montaigne)
            </li>
          </ul>
        </div>

        <div class="brief">
          <h2>Diplômes et certifications</h2>
          <ul class="content-brief">
            <li>
              BUT MMI parcours développement web et dispositifs interactifs
            </li>
            <li>
              Certification Opquast Niveau "avancé" (891 pts), Certification Pix
            </li>
            <li>
              Baccalauréat Général Mention bien et ESABAC (baccalauréat italien)
            </li>
            <li>
              Certificat SST1 (Sauveteur Secouriste du Travail)
            </li>
          </ul>
        </div>
      </div>

      <div class="images">
        <div id="image-1-container" class="image-item image-1">
          <div class="image-nav">
            <p>Test</p>
            <button id="image-1-button" class="button-close-img">
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                <rect width="5.44975" height="0.427431" transform="matrix(0.707643 0.706571 0.706571 -0.707643 0 0.304286)" fill="#1E1E1E" />
                <rect width="5.44975" height="0.427431" transform="matrix(0.706901 -0.707312 -0.707312 -0.706901 0.303955 4.15682)" fill="#1E1E1E" />
              </svg>
            </button>
          </div>
          <div class="image-wrapper">
            <img src="/affilae-1.webp" class="image-content">
            <canvas class="image-canvas" data-src="/affilae-1.webp" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main-content {
  height: 100%;
  padding-block: fluid(26px, 62px, 393px, 1200px);
  color: $primary;
  font-size: $font-size-text;
  font-weight: 400;
  font-family: $font-family-Input;
  position: relative;
}

.cv-link {
  font-weight: 700;
  width: fit-content;
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

.content-text {
  display: flex;
  flex-direction: column;
  gap: 48px;

  @include mq($from desktop) {
    max-width: 50%;
    margin-bottom: 64px;
  }
}

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
  top: 35%;
  right: 20%;
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

h2 {
  font-size: $font-size-title-h2;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: $font-family-Input;
}

.brief,
.content-brief {
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
