import { BodyT, fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const currentDisplayName = ref("");
    const currentPhoto = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (username: string, password: string, displayName: string, photo: string, latitude: string, longitude: string) => {
      await fetchy("/api/users", "POST", {
        body: { username, password, displayName, photo, latitude, longitude },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        const { displayName, photo } = await fetchy(`/api/profiles/${username}`, "GET", {});
        currentUsername.value = username;
        currentDisplayName.value = displayName;
        currentPhoto.value = photo;
      } catch {
        currentUsername.value = "";
        currentDisplayName.value = "";
        currentPhoto.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUser = async (patch: BodyT) => {
      await fetchy("/api/users", "PATCH", { body: { update: patch } });
    };

    const updateProfile = async (patch: BodyT) => {
      await fetchy("/api/profiles", "PATCH", { body: { update: patch } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      currentDisplayName,
      currentPhoto,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUser,
      updateProfile,
      deleteUser,
    };
  },
  { persist: true },
);
