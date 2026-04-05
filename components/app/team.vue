<script setup lang="ts">
type InfoMember = {
  gender: string;
  lastname: string;
  firstname: string;
  job: string;
  link: string;
};

type InfoProjects = {
  type: string;
  description: string;
  title: string;
};
defineProps<{
  members: InfoMember[];
  projects: InfoProjects[];
}>();
</script>

<template>
  <section class="team">
    <div class="team-section">
      <h3>Équipe du projet :</h3>
      <ul class="team-grid">
        <li v-for="member in members" :key="member.link" class="team-item">
          <NuxtLink target="_blank" class="team-item-link" :to="member.link">
            <img class="gender" :src="`/${member.gender}.svg`" :alt="member.gender">
            <div>
              <p class="name">
                {{ member.firstname }} {{ member.lastname }}
              </p>
              <p class="job">
                {{ member.job }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="team-section">
      <h3>Cadre du projet :</h3>
      <ul class="team-grid">
        <li v-for="project in projects" :key="project.title" class="team-item">
          <img class="cadre" :src="`/${project.type}.svg`" :alt="project.type">
          <div>
            <p class="name">
              {{ project.title }}
            </p>
            <p class="job">
              {{ project.description }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.team {
  display: flex;
  flex-direction: column;
  gap: 64px;
  max-width: 90%;
  margin-inline: auto;
  margin-block: 32px;
}

.team-section {
  display: flex;
  flex-direction: column;
  gap: 64px;
  flex-wrap: wrap;
  align-items: start;
}

.team-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 92px;
  margin-inline: auto;

  @include mq($from desktop) {
    margin-inline: unset;
  }
}

.cadre {
  height: fluid(50px, 75px, 393px, 1200px);
}

.team-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
}

.gender {
  height: fluid(64px, 94px, 393px, 1200px);
}

.name {
  color: #fff;
  font-family: $font-family-Input;
  font-size: fluid(14px, 18px, 393px, 1200px);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.job {
  color: #fff;
  font-family: $font-family-Input;
  font-size: fluid(12px, 14px, 393px, 1200px);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

h3 {
  color: #fff;
  font-family: $font-family-Input;
  font-size: fluid(22px, 28px, 393px, 1200px);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.team-item-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
</style>
