<template>
  <div class="container">
    <h1>Four Oh Four you didn't</h1>
    <router-link to="/" exact>ET Go Home</router-link>
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

<style></style>
