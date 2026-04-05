<script setup lang="ts">
</script>

<template>
  <section id="main-content" class="main-content content-crt">
    <div class="content-container">
      <div class="content-text">
        <div class="brief">
          <div class="content-brief">
            <p>Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie numérique, il est porté à la connaissance des utilisateurs et visiteurs, du site https://louisledoussal.fr, les présentes mentions légales.</p>
            <p>La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</p>
          </div>
        </div>

        <div class="brief">
          <h2>Édition du site</h2>
          <div class="content-brief">
            <p>L’édition et la direction de la publication du Site est assurée par Monsieur Le Doussal Louis, domicilié rue jacque Ellul et l'adresse e-mail louis.le-doussal@mmibordeaux.com.</p>
          </div>
        </div>

        <div class="brief">
          <h2>Hébergeur</h2>
          <div class="content-brief">
            <p>L'hébergeur du Site est la société Vercel, dont le siège social est situé au 650 California St 94108 San Francisco.</p>
          </div>
        </div>

        <div class="brief">
          <h2>Accès au site</h2>
          <div class="content-brief">
            <p>Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, l'Editeur pourra, à tout moment, suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou des modifications de son contenu. L'Editeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de cette indisponibilité sur les activités de l'Utilisateur.</p>
            <p>Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation expresse de l’Editeur est prohibée et pourra entraîner des actions et poursuites judiciaires telles que prévues par la règlementation en vigueur.</p>
          </div>
        </div>
        <NuxtLink class="back-main" to="/projects">
          Retour aux projets
        </NuxtLink>
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

.back-main {
  margin-inline: auto;
  margin-bottom: 32px;
}
</style>
