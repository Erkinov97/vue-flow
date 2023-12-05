import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMainStore = defineStore("main", () => {
  // state
  const state = ref({});

  // getter
  const getMainStoreState = computed(() => state.value);

  // action
  function changeState(newValue: object) {
    state.value = newValue;
  }

  return {
    state,
    getMainStoreState,
    changeState,
  };
});
