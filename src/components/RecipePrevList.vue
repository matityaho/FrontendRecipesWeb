<template>
  <b-container>
    <h3 class="title">
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group>
      <span v-for="r in recipes" :key="r.id">
        <RecipePreview :width="widthRecipe" class="recipePreview" :recipe="r" />
        <br />
      </span>
    </b-card-group>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mdbContainer, mdbRow, mdbCardGroup } from "mdbvue";

export default {
  name: "RecipePrevList",
  components: {
    RecipePreview,
  },
  props: {
    widthRecipe: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.title {
  padding-bottom: 5%;
  margin-top: 5%;
  margin-left: 3%;
  color: rgb(255, 254, 244);
  font-size: 40px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
}
</style>
