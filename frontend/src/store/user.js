import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  //state
  const token = ref("myToken");
  //actions
  function zj() {
    this.token = "newToken";
  }
  return {
    token,
    zj,
  };
});
