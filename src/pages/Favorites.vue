<template>
  <div>
    <FavoriteRecipesList
      id="FavoriteRecipes"
      title="Favorite Recipes"
      class="FavoriteRecipes"
    />
  </div>
</template>

<script>
import FavoriteRecipesList from "../components/FavoriteRecipesList";

export default {
  components: {
    FavoriteRecipesList,
  },
  mounted() {
    if (this.$cookies.get("session") == null) {
      this.$root.store.logout();
      localStorage.clear();
      this.$router.push("/").catch(() => {});
    }
  },
};
</script>

<style></style>
