<script setup lang="ts">
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { nextTick, onMounted, onUnmounted } from "vue";

// Récupération de l'état partagé depuis ton composable
const {
  isMusbaOpen,
  MusbaDone,
  MusbaCount,
  MusbaTotal,
  MusbaFinishedBlocks,
} = useNavigation();

gsap.registerPlugin(Flip);

onMounted(async () => {
  await nextTick();

  // Petit délai pour s'assurer que le contenu du brief (AppContent) est injecté
  setTimeout(() => {
    const blocks = document.querySelectorAll(".shake-text");

    // --- 1. INITIALISATION DU TOTAL (Le "100%") ---
    // On calcule le nombre total de caractères une seule fois pour toute la session.
    if (MusbaTotal.value === 0) {
      let totalLetters = 0;
      blocks.forEach((block) => {
        totalLetters += (block.textContent || "").length;
      });
      MusbaTotal.value = totalLetters;
    }

    // --- 2. GESTION DE LA PERSISTENCE ET DES INTERACTIONS ---
    if (MusbaDone.value) {
      // Si tout est déjà terminé, on enlève juste les styles de shake partout
      blocks.forEach(el => el.classList.remove("shake-text"));
    }
    else {
      blocks.forEach((el, index) => {
        // Si ce bloc précis (par son index) a déjà été cliqué lors d'une visite précédente
        if (MusbaFinishedBlocks.value.includes(index)) {
          el.classList.remove("shake-text");
          return;
        }

        // Préparation du texte : transformation en spans pour l'animation
        const text = el.textContent || "";
        el.innerHTML = "";
        text.split("").forEach((letter) => {
          const span = document.createElement("span");
          span.textContent = letter === " " ? "\u00A0" : letter;
          el.appendChild(span);
        });

        // Ajout de l'écouteur de clic (une seule fois par bloc)
        el.addEventListener("click", async () => {
          isMusbaOpen.value = true; // Ouvre la boîte dans la Navigation
          await nextTick();

          const spans = Array.from(el.querySelectorAll("span"));
          const box = document.getElementsByClassName("valid-musba");
          let completedInBlock = 0;

          spans.forEach((span) => {
            const state = Flip.getState(span);

            // Création d'un placeholder invisible pour maintenir la structure du texte
            const placeholder = document.createElement("span");
            placeholder.classList.add("placeholder");
            placeholder.style.visibility = "hidden";
            placeholder.textContent = span.textContent;
            span.parentNode?.replaceChild(placeholder, span);

            // Déplacement physique de la lettre vers la zone cible (DOM Reparenting)
            box[0].appendChild(span);

            Flip.from(state, {
              duration: 1.5,
              ease: "back.in(1.5)",
              absolute: true,
              delay: Math.random() / 3,
              onComplete: () => {
                MusbaCount.value++; // Fait progresser la barre dans navigation.vue

                span.classList.add("new");
                const firstPlaceholder = el.querySelector(".placeholder");
                el.insertBefore(span, firstPlaceholder);

                completedInBlock++;

                // Vérification de la fin de l'animation pour CE bloc
                if (completedInBlock === spans.length) {
                  // Nettoyage : on remet les spans originaux et on vire les placeholders
                  spans.forEach(s => el.appendChild(s));
                  el.querySelectorAll(".placeholder").forEach(p => p.remove());

                  isMusbaOpen.value = false; // Referme la boîte

                  // On mémorise que ce bloc est fini
                  if (!MusbaFinishedBlocks.value.includes(index)) {
                    MusbaFinishedBlocks.value.push(index);
                  }

                  // Si le total global est atteint, on marque tout comme "Done"
                  if (MusbaCount.value >= MusbaTotal.value) {
                    MusbaDone.value = true;
                  }
                }
              },
            });
          });

          // On retire la classe shake immédiatement au clic
          el.classList.remove("shake-text");
        }, { once: true });
      });
    }

    const wrapLetters = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (text.trim() === "")
          return;
        const fragment = document.createDocumentFragment();

        text.split(/(\s+)/).forEach((part) => {
          if (/^\s+$/.test(part)) {
            const space = document.createElement("span");
            space.classList.add("letter");
            space.innerHTML = "&nbsp;";
            fragment.appendChild(space);
          }
          else {
            const word = document.createElement("span");
            word.style.display = "inline-block";
            word.style.whiteSpace = "nowrap";
            part.split("").forEach((letter) => {
              const span = document.createElement("span");
              span.classList.add("letter");
              span.textContent = letter;
              word.appendChild(span);
            });
            fragment.appendChild(word);
          }
        });
        node.parentNode?.replaceChild(fragment, node);
      }
      else if (
        node.nodeType === Node.ELEMENT_NODE
        && !["SCRIPT", "STYLE", "A", "BUTTON"].includes((node as Element).tagName)
        && !(node as Element).classList.contains("shake-text")
      ) {
        Array.from(node.childNodes).forEach(wrapLetters);
      }
    };

    const mainContent = document.querySelector("#main-content");
    if (mainContent)
      wrapLetters(mainContent);

    document.addEventListener("mousemove", (e) => {
      document.querySelectorAll(".shake-text span, .letter").forEach((span) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 120;
        const maxScale = 1.8;
        const elSpan = span as HTMLElement;

        if (distance < maxDistance) {
          const scale = maxScale - ((maxScale - 1) * distance / maxDistance);
          elSpan.style.setProperty("--scale", `${scale}`);
          elSpan.style.zIndex = "10";
        }
        else {
          elSpan.style.setProperty("--scale", "1");
          elSpan.style.zIndex = "";
        }
      });
    });
  }, 100);
});

onUnmounted(() => {
  isMusbaOpen.value = false;
});

definePageMeta({
  title: "Musba",
});
</script>

<template>
  <div>
    <AppContent
      brief="<span class='shake-text'>Le Musée des Beaux-Arts de Bordeaux nous a missionnés pour concevoir un dispositif interactif</span> accompagnant l'exposition sur Jean Dupas. Sur une grande tablette tactile, les visiteurs peuvent explorer ses œuvres à travers une expérience numérique. Le défi était de taille : les créations de Dupas sont aujourd'hui dispersées dans le monde ou difficiles d'accès. Le numérique permet ici de les réunir pour offrir au public un regard complet  sur son travail."
      project-link="https://exposition-dupas-musba.netlify.app/"
      :technos="['Wordpress (thème custom)', 'PHP', 'Bootstrap', 'GSAP']"
      :informations="[{ link: 'https://github.com/nuit-musee-musba/experience-2026', text: 'Repo GitHub' }, { link: 'https://exposition-dupas-musba.netlify.app/', text: 'Lien vers la production' }]"
      :members="[
        { gender: 'male', lastname: 'D', firstname: 'Simon', job: 'Dev', link: 'https://www.linkedin.com/in/simon-daguet-kargl/' },
        { gender: 'male', lastname: 'T', firstname: 'Bilel', job: 'Créa / Dev', link: 'https://www.linkedin.com/in/billel-tighidet/' },
        { gender: 'male', lastname: 'M', firstname: 'Maxence', job: 'Créa : 3D', link: 'https://www.linkedin.com/in/maxence-mingasson-61b840240/' },
        { gender: 'female', lastname: 'S', firstname: 'Camille', job: 'Gestion de projet', link: 'https://www.linkedin.com/in/surget-camille-bordeaux/' },
        { gender: 'male', lastname: 'P', firstname: 'Hugo', job: 'Dev', link: 'https://www.linkedin.com/in/hugo-pinchemel/' },
        { gender: 'male', lastname: 'L', firstname: 'Louis', job: 'Dev', link: 'https://www.linkedin.com/in/louis-le-doussal-206b7a278/' },
        { gender: 'female', lastname: 'L', firstname: 'Léa', job: 'Editorial', link: 'https://www.linkedin.com/in/l%C3%A9a-lafaye-545026215/' },
        { gender: 'female', lastname: 'R', firstname: 'Dina', job: 'Editorial', link: 'https://www.linkedin.com/in/dina-rktnr/' },
        { gender: 'non-binary', lastname: 'V', firstname: 'Nathan', job: 'Editorial', link: 'https://natvand.eu.org' },
        { gender: 'female', lastname: 'J', firstname: 'Naika', job: 'Créa : 3D', link: 'https://www.linkedin.com/in/na%C3%AFka-j-607778224/' },
        { gender: 'male', lastname: 'B', firstname: 'Kilian', job: 'Dev', link: 'https://www.linkedin.com/in/kilian-beney-27031622b/' },
        { gender: 'female', lastname: 'C', firstname: 'Line', job: 'Créa', link: 'https://www.linkedin.com/in/line-cabaret/' }]"
      :projects="[{ type: 'school', description: 'BUT MMI', title: 'Projet étudiant' }]"
      intentions="Nous avons voulu être ambitieux en intégrant de la 3D au projet. L'idée de départ était de proposer une carte interactive pour localiser les œuvres de Jean Dupas à travers le monde. Si la version 2D était fonctionnelle, elle manquait de dynamisme. L'ajout de la 3D a rendu la navigation beaucoup plus immersive grâce aux mouvements de caméra, tout en proposant une représentation des lieux plus originale et stimulante pour le visiteur."
    />
    <div class="valid-musba" />
  </div>
</template>

<style lang="scss">
@use "sass:math";

$max-letters: 30;

@keyframes float-x {
  0% {
    transform: translateX(calc(var(--x) * -1)) scale(var(--scale, 1));
  }
  100% {
    transform: translateX(var(--x)) scale(var(--scale, 1));
  }
}

@keyframes float-y {
  0% {
    transform: translateY(calc(var(--y) * -1)) scale(var(--scale, 1));
  }
  100% {
    transform: translateY(var(--y)) scale(var(--scale, 1));
  }
}

.shake-text {
  cursor: pointer;
  color: $primary;
}

.shake-texts span {
  z-index: 999;
  position: relative;
}

.shake-text span,
.letter {
  display: inline-block;
  position: relative;
  transform: scale(var(--scale, 1));
  transition: transform 0.15s ease-out;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
}

@for $i from 1 through $max-letters {
  .shake-text span:nth-of-type(#{$i}) {
    $duration: math.div(math.random(20) + 15, 10);
    $delay: math.div(math.random(20), 10) * -1s;
    $amplitude: math.div(math.random(2) + 1, 15);

    @if $i % 2 == 0 {
      --x: #{$amplitude}vmin;
      --y: 0vmin;
      animation: float-x #{$duration}s ease-in-out #{$delay} infinite alternate;
    } @else {
      --x: 0vmin;
      --y: #{$amplitude}vmin;
      animation: float-y #{$duration}s ease-in-out #{$delay} infinite alternate;
    }
  }
}

.valid-musba {
  position: absolute;
  bottom: 15%;
  left: 90%;
}
</style>
