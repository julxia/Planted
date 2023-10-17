<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const displayName = ref("");
const photoLink = ref("");

const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  await createUser(username.value, password.value, displayName.value, photoLink.value, "0", "0");
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-displayName">Display Name</label>
        <input type="text" v-model.trim="displayName" id="aligned-displayName" placeholder="Display Name" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-profilePhoto">Profile Photo Link</label>
        <input v-model.trim="photoLink" type="text" id="aligned-profilePhoto" placeholder="Profile Photo Link" required />
      </div>
      <p>Leaving latitude and longitude default 0 for now until future implementation</p>
      <div class="pure-control-group">
        <label for="aligned-latitude">Latitude</label>
        <input value="0" type="text" id="aligned-latitude" placeholder="Latitude" disabled />
      </div>
      <div class="pure-control-group">
        <label for="aligned-longitude">Longitude</label>
        <input value="0" type="text" id="aligned-longitude" placeholder="Longitude" disabled />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
