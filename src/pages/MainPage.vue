<template>
  <div class="container">
    <b-row class="r" style="margin-left: 6%;">
      <div class="column leftc">
        <br />
        <RecipePrevList
          widthRecipe="20rem"
          :recipes="recipes"
          id="RandomRecipes"
          title="Random Recipes"
        />
        <b-button
          style="position: relative; left: 129px;"
          @click="updateRecipes"
          >New recipes</b-button
        >
        <br />
        <br />
      </div>
      <div class="column rightc">
        <br />
        <b-card
          bg-variant="light"
          v-if="!this.$root.store.username"
          class="container"
        >
          <h1
            class="title"
            style="color: rgb(58, 58, 58); text-shadow: 0px 0px 0px #000000;"
          >
            Login
          </h1>
          <b-form @submit.prevent="onLogin">
            <b-form-group
              id="input-group-Username"
              label-cols-sm="3"
              label="Username:"
              label-for="Username"
            >
              <b-form-input
                id="Username"
                v-model="$v.form.username.$model"
                type="text"
                :state="validateState('username')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Username is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-Password"
              label-cols-sm="3"
              label="Password:"
              label-for="Password"
            >
              <b-form-input
                id="Password"
                type="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Password is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button
              type="submit"
              variant="warning"
              style="width:100px;display:block;"
              class="mx-auto w-100"
              >Login</b-button
            >
            <div class="mt-2">
              Do not have an account yet?
              <router-link to="register"> Register in here</router-link>
            </div>
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
          >
            Login failed: {{ form.submitError }}
          </b-alert>
        </b-card>

        <LastWatchedList
          id="LastViewRecipes"
          v-else
          title="Last Viewed Recipes"
          disabled
        />
      </div>
    </b-row>
  </div>
</template>

<script>
import RecipePrevList from "../components/RecipePrevList";
import LastWatchedList from "../components/LastWatchedList";

import { required } from "vuelidate/lib/validators";

export default {
  components: {
    RecipePrevList,
    LastWatchedList,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    async updateRecipes() {
      if (this.$cookies.get("session") == null) {
        this.$root.store.logout();
        localStorage.clear();
      }
      try {
        const response = await this.axios.get(
          "http://localhost:3100/recipes/randomRecpies"
        );

        console.log(response.data);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post("http://localhost:3100/Login", {
          username: this.form.username,
          password: this.form.password,
        });
        this.$root.store.login(this.form.username);
        this.updateRecipes();
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    },
  },
};
</script>

<style>
.leftc {
  width: 50%;
}
.rightc {
  width: 50%;
}
</style>
