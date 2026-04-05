<script setup lang="ts">
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { nextTick, onMounted, onUnmounted } from "vue";

// Récupération de l'état partagé depuis ton composable
const {
  isEspaceQGOpen,
  EspaceQGDone,
  EspaceQGCount,
  EspaceQGTotal,
  EspaceQGFinishedBlocks,
} = useNavigation();

gsap.registerPlugin(Flip);

onMounted(async () => {
  await nextTick();

  // Petit délai pour s'assurer que le contenu du brief (AppContent) est injecté
  setTimeout(() => {
    const blocks = document.querySelectorAll(".shake-text");

    // --- 1. INITIALISATION DU TOTAL (Le "100%") ---
    // On calcule le nombre total de caractères une seule fois pour toute la session.
    if (EspaceQGTotal.value === 0) {
      let totalLetters = 0;
      blocks.forEach((block) => {
        totalLetters += (block.textContent || "").length;
      });
      EspaceQGTotal.value = totalLetters;
    }

    // --- 2. GESTION DE LA PERSISTENCE ET DES INTERACTIONS ---
    if (EspaceQGDone.value) {
      // Si tout est déjà terminé, on enlève juste les styles de shake partout
      blocks.forEach(el => el.classList.remove("shake-text"));
    }
    else {
      blocks.forEach((el, index) => {
        // Si ce bloc précis (par son index) a déjà été cliqué lors d'une visite précédente
        if (EspaceQGFinishedBlocks.value.includes(index)) {
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
          isEspaceQGOpen.value = true; // Ouvre la boîte dans la Navigation
          await nextTick();

          const spans = Array.from(el.querySelectorAll("span"));
          const box = document.getElementsByClassName("valid-espace-qg");
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
                EspaceQGCount.value++; // Fait progresser la barre dans navigation.vue

                span.classList.add("new");
                const firstPlaceholder = el.querySelector(".placeholder");
                el.insertBefore(span, firstPlaceholder);

                completedInBlock++;

                // Vérification de la fin de l'animation pour CE bloc
                if (completedInBlock === spans.length) {
                  // Nettoyage : on remet les spans originaux et on vire les placeholders
                  spans.forEach(s => el.appendChild(s));
                  el.querySelectorAll(".placeholder").forEach(p => p.remove());

                  isEspaceQGOpen.value = false; // Referme la boîte

                  // On mémorise que ce bloc est fini
                  if (!EspaceQGFinishedBlocks.value.includes(index)) {
                    EspaceQGFinishedBlocks.value.push(index);
                  }

                  // Si le total global est atteint, on marque tout comme "Done"
                  if (EspaceQGCount.value >= EspaceQGTotal.value) {
                    EspaceQGDone.value = true;
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
  isEspaceQGOpen.value = false;
});

definePageMeta({
  title: "Espace QG",
});
</script>

<template>
  <div>
    <AppContent
      brief="J'ai accompagné l'association Espace QG, une asso organisant des événements culturels autour des thématiques de genre et de sexualité, dans la refonte de leur site web. <span class='shake-text'>En l'absence de profil technique au sein de l'équipe</span>, je me suis porté volontaire pour piloter le développement sous WordPress. Il fallais concevoir une plateforme pérenne et intuitive. L'architecture a été pensée pour être administrée en totale autonomie par l'association sans barrière technique."
      :technos="['Wordpress (thème custom)', 'PHP', 'Bootstrap', 'GSAP']"
      :informations="[{ link: 'https://github.com/Louis3133/espace-qg', text: 'Lien vers le repo GitHub' }]"
      :members="[{ gender: 'female', lastname: 'L', firstname: 'Léa', job: 'Créa / Dev', link: 'https://www.linkedin.com/in/l%C3%A9a-lafaye-545026215/' }, { gender: 'female', lastname: 'C', firstname: 'Line', job: 'Créa / Dev', link: 'https://www.linkedin.com/in/line-cabaret/' }, { gender: 'male', lastname: 'L', firstname: 'Louis', job: 'Lead dev', link: 'https://www.linkedin.com/in/louis-le-doussal-206b7a278/' }]"
      :projects="[{ type: 'personal', description: 'Engagement associatif', title: 'Projet personnel' }]"
      intentions="Dès le départ, l’esthétique audacieuse de ce projet a été une véritable source de motivation. Loin des standards habituels, ce site propose un univers visuel qui 'casse les codes', ce qui représentait un défi d’intégration particulièrement stimulant. J'ai immédiatement perçu le potentiel de ces maquettes pour le design d’interaction. J’en ai donc profité pour intégrer de nombreuses animations, visant à renforcer le dynamisme  et à rendre l'expérience utilisateur aussi unique que son identité visuelle."
    />
    <div class="valid-espace-qg" />
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

.valid-espace-qg {
  position: absolute;
  bottom: 15%;
  left: 28%;
}
</style>
