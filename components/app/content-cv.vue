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

      <div class="model-3d">
        <p>Modèle 3D</p>
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

.model-3d {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @include mq($from desktop) {
    position: fixed;
    right: 0;
    top: 50%;
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
