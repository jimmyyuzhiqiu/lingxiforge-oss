import { defineStore } from "pinia";

export const useTokenStore = defineStore("lingxiforge_demo_token_v2", () => {
  let localToken = localStorage.getItem("lingxiforge_demo_token_v2") || "";
  const setToken = (token: string) => {
    localToken = token;
    localStorage.setItem("lingxiforge_demo_token_v2", token);
  };

  return {
    localToken,
    setToken,
  };
});
