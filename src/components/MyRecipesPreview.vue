<template>
  <mdb-container>
    <mdb-card style="width: 20rem; ">
      <mdb-view hover>
        <router-link
          :to="{ name: 'myRecipe', params: { recipeId: recipe.recipe_id } }"
        >
          <mdb-card-image
            style="width: 20rem;"
            v-b-tooltip.hover
            title="Click to enter the recipe"
            :src="recipe.photo"
            alt="Card image cap"
            class="imgRef"
          ></mdb-card-image>
          <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
        </router-link>
      </mdb-view>
      <mdb-card-body color="elegant" class="white-text">
        <mdb-card-title>{{ recipe.recipe_name }}</mdb-card-title>

        <img
          v-if="recipe.vegan == 'yes'"
          v-b-tooltip.hover
          title="Vegan"
          width="30px"
          height="30px"
          src="https://png.pngtree.com/png-vector/20191030/ourlarge/pngtree-icon-for-vegan-food-vector-illustration-symbols-isolated-on-white-background-png-image_1870595.jpg"
        />&nbsp;
        <img
          v-if="recipe.vegetarian == 'yes'"
          v-b-tooltip.hover
          title="Vegetarian"
          width="20px"
          height="20px"
          src="data:image/png;base64,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"
        />&nbsp;
        <img
          v-if="recipe.glutenFree == 'yes'"
          v-b-tooltip.hover
          title="Gluten free"
          width="20px"
          height="20px"
          src="data:image/png;base64,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"
        />
        <img
          v-else
          v-b-tooltip.hover
          title="Contains gluten"
          width="20px"
          height="20px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Fc0RXY1-wVyL9Uy2wkD5iZVm8YTQdp6w0OW1IuUmMCPtSag&s"
        />
        <br />
        <b-icon-clock />
        {{ recipe.totalTime }} minutes
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbView,
  mdbMask,
} from "mdbvue";

export default {
  data() {
    return {};
  },
  components: {
    mdbContainer,
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbView,
    mdbMask,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.imgRef:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
