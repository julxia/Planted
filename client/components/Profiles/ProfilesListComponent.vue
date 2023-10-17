<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { fetchy } from "../../utils/fetchy";

const loaded = ref(false);
let profiles = ref<Array<Record<string, string>>>([]);

async function getProfiles() {
  let profilesResults;
  try {
    profilesResults = await fetchy("/api/profiles", "GET");
  } catch (_) {
    return;
  }
  console.log(profilesResults);
  profiles.value = profilesResults;
}

onBeforeMount(async () => {
  await getProfiles();
  loaded.value = true;
});
</script>

<template>
  <section class="profiles" v-if="loaded && profiles.length !== 0">
    <article v-for="profile in profiles" :key="profile._id">
      <p>{{ profile.username }}</p>
      <p>{{ profile.displayName }}</p>
      <div style="text-align: center">
        <img id="profile" :src="profile.photo" alt="ProfilePhoto" width="200" />
      </div>
    </article>
  </section>
  <p v-else-if="loaded">No profiles found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.profiles {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
