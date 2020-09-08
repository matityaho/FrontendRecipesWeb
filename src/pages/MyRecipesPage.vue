<template>
  <div>
    <MyRecipesList id="MyRecipesList" title="My Recipes" class="MyRecipes" />
  </div>
</template>

<script>
import MyRecipesList from "../components/MyRecipesList";

export default {
  components: {
    MyRecipesList,
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
