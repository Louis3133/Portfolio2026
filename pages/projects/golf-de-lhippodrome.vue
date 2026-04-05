<script setup lang="ts">
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { nextTick, onMounted, onUnmounted } from "vue";

// Récupération de l'état partagé depuis ton composable
const {
  isGolfOpen,
  GolfDone,
  GolfCount,
  GolfTotal,
  GolfFinishedBlocks,
} = useNavigation();

gsap.registerPlugin(Flip);

onMounted(async () => {
  await nextTick();

  // Petit délai pour s'assurer que le contenu du brief (AppContent) est injecté
  setTimeout(() => {
    const blocks = document.querySelectorAll(".shake-text");

    // --- 1. INITIALISATION DU TOTAL (Le "100%") ---
    // On calcule le nombre total de caractères une seule fois pour toute la session.
    if (GolfTotal.value === 0) {
      let totalLetters = 0;
      blocks.forEach((block) => {
        totalLetters += (block.textContent || "").length;
      });
      GolfTotal.value = totalLetters;
    }

    // --- 2. GESTION DE LA PERSISTENCE ET DES INTERACTIONS ---
    if (GolfDone.value) {
      // Si tout est déjà terminé, on enlève juste les styles de shake partout
      blocks.forEach(el => el.classList.remove("shake-text"));
    }
    else {
      blocks.forEach((el, index) => {
        // Si ce bloc précis (par son index) a déjà été cliqué lors d'une visite précédente
        if (GolfFinishedBlocks.value.includes(index)) {
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
          isGolfOpen.value = true; // Ouvre la boîte dans la Navigation
          await nextTick();

          const spans = Array.from(el.querySelectorAll("span"));
          const box = document.getElementsByClassName("valid-golf");
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
                GolfCount.value++; // Fait progresser la barre dans navigation.vue

                span.classList.add("new");
                const firstPlaceholder = el.querySelector(".placeholder");
                el.insertBefore(span, firstPlaceholder);

                completedInBlock++;

                // Vérification de la fin de l'animation pour CE bloc
                if (completedInBlock === spans.length) {
                  // Nettoyage : on remet les spans originaux et on vire les placeholders
                  spans.forEach(s => el.appendChild(s));
                  el.querySelectorAll(".placeholder").forEach(p => p.remove());

                  isGolfOpen.value = false; // Referme la boîte

                  // On mémorise que ce bloc est fini
                  if (!GolfFinishedBlocks.value.includes(index)) {
                    GolfFinishedBlocks.value.push(index);
                  }

                  // Si le total global est atteint, on marque tout comme "Done"
                  if (GolfCount.value >= GolfTotal.value) {
                    GolfDone.value = true;
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
  isGolfOpen.value = false;
});

definePageMeta({
  title: "Golf de l'hippodrome",
});
</script>

<template>
  <div>
    <AppContent
      brief="<span class='shake-text'>Sous l'encadrement de Kaizen Agency, j'ai pris en charge l'intégration du site du Golf de l’Hippodrome</span>. Ce fut l'un de mes premiers projets gérés en totale autonomie. L'enjeu était de taille : livrer une première version opérationnelle dans des délais très serrés pour répondre à un besoin immédiat du client. La contrainte de temps était le paramètre majeur de cette mission. Pour la respecter sans sacrifier la qualité, je me suis appuyé sur les process internes de l'agence, à la fois fiables et efficaces."
      project-link="https://www.golf-hippodrome.fr/"
      :technos="['Wordpress (thème custom)', 'PHP', 'Bootstrap', 'GSAP']"
      :informations="[{ link: 'https://www.golf-hippodrome.fr/', text: 'Lien vers la production' }]"
      :members="[{ gender: 'female', lastname: 'B', firstname: 'Léa', job: 'Cheffe de projet', link: 'https://www.linkedin.com/in/l%C3%A9a-bruyeres-24a428172/' }, { gender: 'male', lastname: 'K', firstname: 'Julien', job: 'Lead intégrateur', link: 'https://www.linkedin.com/in/hbenabdi/' }, { gender: 'male', lastname: 'L', firstname: 'Louis', job: 'Intégrateur', link: 'https://www.linkedin.com/in/louis-le-doussal-206b7a278/' }]"
      :projects="[{ type: 'enterprise', description: 'Entreprise', title: 'Kaizen Agency' }]"
      intentions="La maquette ayant été conçue par l'équipe créative de Kaizen, j'ai pu m'impliquer dès la phase de conception en étant force de proposition. Au moment de l’intégration, j’ai cherché à apporter ma touche personnelle via des animations fluides et discrètes pour dynamiser le site tout en respectant sa sobriété. Ce projet a surtout été l'occasion de confirmer mon autonomie et d’approfondir ma maîtrise de la bibliothèque GSAP."
    />
    <div class="valid-golf" />
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

.valid-golf {
  position: absolute;
  bottom: 15%;
  left: 70%;
}
</style>
