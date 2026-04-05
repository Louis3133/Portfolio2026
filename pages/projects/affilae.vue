<script setup lang="ts">
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { nextTick, onMounted, onUnmounted } from "vue";

// Récupération de l'état partagé depuis ton composable
const {
  isAffilaeOpen,
  affilaeDone,
  affilaeCount,
  affilaeTotal,
  affilaeFinishedBlocks,
} = useNavigation();

gsap.registerPlugin(Flip);

onMounted(async () => {
  await nextTick();

  // Petit délai pour s'assurer que le contenu du brief (AppContent) est injecté
  setTimeout(() => {
    const blocks = document.querySelectorAll(".shake-text");

    // --- 1. INITIALISATION DU TOTAL (Le "100%") ---
    // On calcule le nombre total de caractères une seule fois pour toute la session.
    if (affilaeTotal.value === 0) {
      let totalLetters = 0;
      blocks.forEach((block) => {
        totalLetters += (block.textContent || "").length;
      });
      affilaeTotal.value = totalLetters;
    }

    // --- 2. GESTION DE LA PERSISTENCE ET DES INTERACTIONS ---
    if (affilaeDone.value) {
      // Si tout est déjà terminé, on enlève juste les styles de shake partout
      blocks.forEach(el => el.classList.remove("shake-text"));
    }
    else {
      blocks.forEach((el, index) => {
        // Si ce bloc précis (par son index) a déjà été cliqué lors d'une visite précédente
        if (affilaeFinishedBlocks.value.includes(index)) {
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
          isAffilaeOpen.value = true; // Ouvre la boîte dans la Navigation
          await nextTick();

          const spans = Array.from(el.querySelectorAll("span"));
          const box = document.getElementsByClassName("valid");
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
                affilaeCount.value++; // Fait progresser la barre dans navigation.vue

                span.classList.add("new");
                const firstPlaceholder = el.querySelector(".placeholder");
                el.insertBefore(span, firstPlaceholder);

                completedInBlock++;

                // Vérification de la fin de l'animation pour CE bloc
                if (completedInBlock === spans.length) {
                  // Nettoyage : on remet les spans originaux et on vire les placeholders
                  spans.forEach(s => el.appendChild(s));
                  el.querySelectorAll(".placeholder").forEach(p => p.remove());

                  isAffilaeOpen.value = false; // Referme la boîte

                  // On mémorise que ce bloc est fini
                  if (!affilaeFinishedBlocks.value.includes(index)) {
                    affilaeFinishedBlocks.value.push(index);
                  }

                  // Si le total global est atteint, on marque tout comme "Done"
                  if (affilaeCount.value >= affilaeTotal.value) {
                    affilaeDone.value = true;
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
  isAffilaeOpen.value = false;
});

definePageMeta({
  title: "Affilae",
});
</script>

<template>
  <div>
    <AppContent
      brief="<span class='shake-text'>Sous l'encadrement de Kaizen Agency</span>, j'ai travaillé sur la refonte du site d'Affilae, une agence spécialisée dans l'affiliation. Une particularité de ce projet : le client partage nos bureaux. Si cette proximité facilite grandement la communication, elle favorise aussi un nombre important de retours et d'allers-retours en temps réel. Ma mission était d'assurer une intégration fidèle. Au-delà de l'exécution, <span class='shake-text'> j'ai eu un rôle de conseil pour orienter le client vers des solutions </span> techniques plus propres, durables et surtout conformes aux normes."
      project-link="https://affilae-v2.staging2.kaizen-developments.com/fr/accueil/"
      :technos="['Wordpress (thème custom)', 'PHP', 'Bootstrap', 'GSAP']"
      :informations="[{ link: 'https://affilae-v2.staging2.kaizen-developments.com/fr/accueil/', text: 'Lien vers le staging' }]"
      :members="[{ gender: 'female', lastname: 'B', firstname: 'Habiba', job: 'Cheffe de projet', link: 'https://www.linkedin.com/in/hbenabdi/' }, { gender: 'male', lastname: 'K', firstname: 'Julien', job: 'Lead intégrateur', link: 'https://www.linkedin.com/in/julien-kircher-4a048691/' }, { gender: 'male', lastname: 'M', firstname: 'Antoine', job: 'Intégrateur', link: 'https://www.linkedin.com/in/antoine-moyet-94a47984/' }]"
      :projects="[{ type: 'enterprise', description: 'Entreprise', title: 'Kaizen Agency' }]"
      intentions="Le design ayant été réalisé en interne par Affilae, ma mission première était de respecter scrupuleusement leurs maquettes. Toutefois, j’ai été force de proposition en suggérant plusieurs animations pour rendre l’interface plus dynamique . J’ai pris quelques libertés créatives pour apporter du “juice” au site, une initiative qui a été très bien accueillie par leurs équipes."
    />
    <div class="valid" />
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

.valid {
  position: absolute;
  bottom: 15%;
  left: 12%;
}
</style>
