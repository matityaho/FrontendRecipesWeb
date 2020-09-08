<template>
  <b-container>
    <h3 class="title">
      Family Recipes
    </h3>
    <b-row v-for="r in recipes" :key="r.id">
      <FamilyRecipe class="recipePreview" :recipe="r" />
      <br />
    </b-row>
  </b-container>
</template>

<script>
import FamilyRecipe from "../components/FamilyRecipe";
export default {
  name: "Family",
  components: {
    FamilyRecipe,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    if (this.$cookies.get("session") == null) {
      this.$root.store.logout();
      localStorage.clear();
      this.$router.push("/").catch(() => {});
    }
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3100/users/FamilyRecipes"
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
        this.$router.push("/login").catch(() => {
          this.$forceUpdate();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding-bottom: 5%;
  margin-top: 5%;
  margin-left: 36%;
  color: rgb(255, 254, 244);
  font-size: 40px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
}
</style>
