<template>
  <div id="app">
    <b-navbar
      variant="dark"
      sticky
      id="nav"
      toggleable="lg"
      type="dark"
      style="font-size: 20px; height: 60px;"
    >
      <b-navbar-brand :to="{ name: 'main' }">
        <img
          src="https://cdn3.iconfinder.com/data/icons/food-set-2-1/91/Food_C152-512.png"
          width="35px"
          height="35px"
        />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'main' }"> Home</b-nav-item>
        <b-nav-item :to="{ name: 'search' }"> Search</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
        <b-nav-text style=" color: white;">Hello Guest:</b-nav-text>

        <b-nav-item :to="{ name: 'register' }"> Register</b-nav-item>
        <b-nav-item :to="{ name: 'login' }"> Login</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-text style="margin-top: 3%; color: white;">
          Hello {{ $root.store.username }}:
        </b-nav-text>
        <b-nav-item-dropdown id="dropdown-1" text="Personal" class="m-md-2">
          <b-dropdown-item :to="{ name: 'favorites' }">
            Favorites
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'family' }">
            Family Recipes
          </b-dropdown-item>

          <b-dropdown-item :to="{ name: 'myRecipes' }">
            My Recipes
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-button style="height: 40px; margin-top: 4%;" @click="Logout"
          >Logout</b-button
        >
      </b-navbar-nav>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$cookies.remove("session");
      localStorage.clear();
      this.$router.push("/login").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style>
body {
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    ),
    url("https://images-na.ssl-images-amazon.com/images/I/71ine%2BPvkqL._AC_SL1134_.jpg")
      no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
