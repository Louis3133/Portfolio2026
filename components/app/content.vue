<script setup lang="ts">
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

defineProps<{
  brief: string;
  projectLink: string;
  technos: string[];
  informations: InfoItem[];
  members: Member[];
  projects: Project[];
  intentions: string;
}>();
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

      <div class="model-3d" />
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

.model-3d {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  margin-block: 48px;

  @include mq($from desktop) {
    position: fixed;
    right: 0;
    top: 0;
    margin-block: unset;
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
