<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");
let password = ref("");

let displayName = ref("");
let photo = ref("");

const { updateUser, updateSession, updateProfile } = useUserStore();

async function updateUsername() {
  await updateUser({ username: username.value });
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}

async function updateDisplayName() {
  await updateProfile({ displayName: displayName.value });
  await updateSession();
}

async function updateProfilePhoto() {
  await updateProfile({ photo: photo.value });
  await updateSession();
}
</script>

<template>
  <h2>Update user details</h2>
  <form @submit.prevent="updateUsername" class="pure-form">
    <fieldset>
      <legend>Change your username</legend>
      <input type="text" placeholder="New username" v-model="username" required />
      <button type="submit" class="pure-button pure-button-primary">Update username</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatePassword" class="pure-form">
    <fieldset>
      <legend>Change your password</legend>
      <input type="password" placeholder="New password" v-model="password" required />
      <button type="submit" class="pure-button pure-button-primary">Update password</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateDisplayName" class="pure-form">
    <fieldset>
      <legend>Change your display name</legend>
      <input type="text" placeholder="New display name" v-model="displayName" required />
      <button type="submit" class="pure-button pure-button-primary">Update display name</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateProfilePhoto" class="pure-form">
    <fieldset>
      <legend>Change your profile photo</legend>
      <input type="text" placeholder="New display photo" v-model="photo" required />
      <button type="submit" class="pure-button pure-button-primary">Update display photo</button>
    </fieldset>
  </form>
</template>
