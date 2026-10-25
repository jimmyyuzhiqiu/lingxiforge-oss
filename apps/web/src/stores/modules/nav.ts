import { defineStore } from "pinia";

export type NavSectionId =
  | "hero"
  | "pain-points"
  | "solutions"
  | "process"
  | "gallery-preview"
  | "metrics"
  | "cooperation"
  | "faq";

export const useNavStore = defineStore("nav", {
  state: () => ({
    mobileOpen: false,
    activeSection: "hero" as NavSectionId,
  }),
  actions: {
    openMobile() {
      this.mobileOpen = true;
    },
    closeMobile() {
      this.mobileOpen = false;
    },
    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
    },
    setActiveSection(id: NavSectionId) {
      this.activeSection = id;
    },
  },
});
