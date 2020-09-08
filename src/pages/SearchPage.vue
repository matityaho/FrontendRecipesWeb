<template>
  <div>
    <b-row>
      <b-col id="container">
        <b-card bg-variant="light">
          <b-overlay :show="show" rounded="sm" @hidden="onHidden">
            <label>Enter query:</label>

            <b-input
              placeholder="type search keyword (at least 1 letter)"
              id="search"
              v-model="$v.search.$model"
              type="text"
              required
            ></b-input>
            <br />
            <label>Amount of recipies:</label
            ><b-select
              id="amount"
              v-model="$v.amount.$model"
              :options="amounts"
            ></b-select>
            <br /><br />
            <div style="margin-left: 7px;">
              &nbsp;
              <b-dropdown style="width: 130px;" text="Cuisine">
                Press CTRL for multiple selection
                <b-select
                  multiple
                  id="cuisine"
                  v-model="$v.cuisine.$model"
                  :options="cuisines"
                >
                </b-select>
              </b-dropdown>
              &nbsp;
              <b-dropdown style="width: 130px;" text="Diet">
                Press CTRL for multiple selection
                <b-select
                  multiple
                  id="diet"
                  v-model="$v.diet.$model"
                  :options="diets"
                >
                </b-select>
              </b-dropdown>
              &nbsp;
              <b-dropdown style="width: 130px;" text="Intolerance">
                Press CTRL for multiple selection
                <b-select
                  multiple
                  id="intolerance"
                  v-model="$v.intolerance.$model"
                  :options="intolerances"
                >
                </b-select>
              </b-dropdown>
            </div>
            <br />
            <div>
              <b-button
                @click="onReset"
                variant="warning"
                style="font-size: 20px; width: 90px;"
                >Reset</b-button
              >
              <b-button
                @click="onSearch"
                variant="primary"
                style="font-size: 20px; width: 150px; float: right;"
                >Search</b-button
              >
            </div>
            <template v-slot:overlay>
              <div class="text-center">
                <b-icon
                  icon="stopwatch"
                  font-scale="3"
                  animation="cylon"
                ></b-icon>
                <p id="cancel-label">Please wait...</p>
              </div>
            </template>
          </b-overlay>
        </b-card>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <div class="column left">
        <div ref="show" :aria-hidden="show ? 'true' : null">
          <div v-if="recipes.length != 0">
            <RecipePrevList
              widthRecipe="19rem"
              title="Search results"
              :v-if="!recipes.length"
              :recipes="recipes"
            />
          </div>
          <div v-if="emptyRes">
            There is no recipies matched your query..
            <br />
            <b-icon icon="exclamation-triangle"></b-icon>
          </div>
        </div>
      </div>
      <div class="column right">
        <div ref="show" :aria-hidden="show ? 'true' : null">
          <br /><br /><br /><br />
          <div v-if="recipes.length != 0">
            <b-button @click="OrderByTime" variant="dark"
              >Order by time</b-button
            ><br /><br />
            <b-button @click="OrderByPopularity" variant="dark"
              >Order by popularity</b-button
            >
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import cuisines from "../assets/cusine";
import diets from "../assets/diet";
import intolerances from "../assets/intolerance";
import { required } from "vuelidate/lib/validators";
import RecipePrevList from "../components/RecipePrevList";

export default {
  name: "Search",
  components: {
    RecipePrevList,
  },
  data() {
    return {
      search: "",
      amount: "5",
      cuisine: [],
      diet: [],
      intolerance: [],
      submitError: undefined,

      amounts: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 15, text: "15" },
      ],
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      recipes: [],
      emptyRes: false,
      show: false,
      errors: [],
      validated: false,
    };
  },
  validations: {
    search: {
      required,
    },
    amount: {
      required,
    },
    cuisine: {},
    diet: {},
    intolerance: {},
  },
  mounted() {
    if (this.$cookies.get("session") == null) {
      this.$root.store.logout();
      localStorage.clear();
    }
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    if (localStorage.getItem("Info")) {
      this.recipes = JSON.parse(localStorage.getItem("Info"));
    }
  },
  methods: {
    async Search() {
      try {
        const response = await this.axios.post(
          "http://localhost:3100/recipes/search/query/" +
            this.search +
            "/amount/" +
            this.amount,
          {
            cuisine: this.cuisine,
            diet: this.diet,
            intolerance: this.intolerance,
          }
        );

        this.show = false;
        if (response.data.length == 0) {
          this.emptyRes = true;
          this.recipes = [];
        } else {
          this.recipes = response.data;
          if (this.$cookies.get("session") != null) {
            localStorage.setItem("Info", JSON.stringify(this.recipes));
          }
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    onSearch() {
      if (this.search.length > 0) {
        this.Search();
        this.show = true;
      }
    },
    onReset() {
      this.search = "";
      this.amount = "5";
      this.cuisine = [];
      this.diet = [];
      this.intolerance = [];

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    OrderByTime() {
      var compare = function(a, b) {
        return a.totalTime - b.totalTime;
      };
      this.recipes = this.recipes.sort(compare);
    },
    OrderByPopularity() {
      var compare = function(a, b) {
        return b.likesAmount - a.likesAmount;
      };
      this.recipes = this.recipes.sort(compare);
    },

    onHidden() {
      // Focus the show button when the overlay is removed
      this.$refs.show.focus();
    },
  },
};
</script>
<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);
.column {
  float: left;
}
.left {
  width: 85%;
}
.right {
  width: 15%;
}
#container {
  margin-top: 2%;
  max-width: 500px;
  margin-left: 380px;
}
.row {
  margin-right: 0px;
}
</style>
