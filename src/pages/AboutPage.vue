<template>
  <div class="container">
    <h1 class="title">About</h1>
    <b-card class="about">
      <b-card-text>
        We are Hay Matityaho and May Vaitz, information systems engineering
        students. <br />
        As part of an Internet development environment course, we created a
        recipes web application. <br />
        In this project we develop a server side (using node.js platform) and
        client side (using vue.js platform) web application. <br />
        Our web application offers all user to search recipes by query, cuisine
        type, diet and intolerance. <br />
        Everyone can sign up and save favorite recipes, so it's possible to get
        back to them again quickly.

        <br /><br />
        <b-icon-arrow-right-circle />
        Our previous web projects:
        <br />
        <a
          href="https://sise-web-development-environments.github.io/assignment2-may_hay/"
          class="fa-lg p-2 m-2 tw-ic"
          target="_blank"
          >PacMan Game (assignment 2)</a
        >
        <br />
        <a
          href="https://sise-web-development-environments.github.io/312411499/"
          class="fa-lg p-2 m-2 tw-ic"
          target="_blank"
          >Sheldon Cooper- May (assignment 1)</a
        >
        <br />
        <a
          href="https://sise-web-development-environments.github.io/204158935/"
          class="fa-lg p-2 m-2 tw-ic"
          target="_blank"
          >Grandpa Asher- Hay (assignment 1)</a
        >
        <br />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$cookies.get("session") == null) {
      this.$root.store.logout();
      localStorage.clear();
    }
  },
};
</script>

<style>
.about {
  width: 70%;
}
</style>
