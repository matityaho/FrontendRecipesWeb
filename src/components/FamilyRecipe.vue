<template>
  <div>
    <b-card
      bg-variant="light"
      no-body
      class="overflow-hidden"
      style="max-width: 1300px;max-height: 700px;"
    >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            :src="recipe.photo"
            alt="Image"
            class="rounded-0"
            style="width: 100%; height: 100%;"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="recipe.recipe_name">
            <b-card-text>
              <ul class="recipe-overview">
                <li>Author: {{ recipe.author }}</li>
                <li>Ready in {{ recipe.totalTime }}</li>
                <li>Timing: {{ recipe.timing }}</li>
              </ul>
              <div>
                <h5>Ingredients:</h5>
                {{ recipe.ingredients }}
              </div>
              <br />
              <div>
                <h5>Instructions:</h5>
                {{ recipe.details }}
              </div>
              <br />
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
