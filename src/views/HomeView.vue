<script setup lang="ts">
import {ref, watch} from "vue";

const flows = localStorage.getItem('flows')
const cards = ref(flows && JSON.parse(flows) || [
  {
    id: crypto.randomUUID(),
    title: "Node 1",
    subtitle: "node 1 subtitle",
    date: "11/1/19",
  }
]);

const createDate = ref(
  new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear()
);

const createNewFlow = () => {
  cards.value = [...cards.value, {
    id: crypto.randomUUID(),
    title: "Node 3",
    subtitle: "node 3 subtitle",
    date: createDate.value,
  }]
};
watch(() => cards.value, () => {
  console.log('change')
  localStorage.setItem('flows', JSON.stringify(cards.value))
})

</script>
<template>
  <div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <div
        class="cursor-pointer my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        @click="createNewFlow"
      >
        <article
          class="flex justify-center items-center gap-3 overflow-hidden h-full rounded-lg shadow-lg text-xl"
        >
          <i class="fa-solid fa-plus"></i>
          <span>Yangi flow qo'shish</span>
        </article>
      </div>
      <!-- Column -->
      <RouterLink
        :to="`view/${card.id}`"
        class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        v-for="card in cards"
        :key="card.id"
      >
        <!-- Article -->
        <article class="overflow-hidden rounded-lg shadow-lg">
          <header
            class="flex items-center justify-between leading-tight p-2 md:p-4"
          >
            <h1 class="text-lg">
              <a class="no-underline hover:underline text-black" href="#">
                ID: {{ card.id }}
              </a>
            </h1>
          </header>
          <div class="p-2 md:p-4">
            <p class="text-grey-darker text-base">Sarlavha{{ card.title }}</p>
            <p class="text-grey-darker text-base">
              Yaratilgan sana: {{ card.date }}
            </p>
          </div>

          <footer
            class="flex items-center justify-between leading-none p-2 md:p-4"
          >
            Izoh:
            <p class="ml-2 text-sm">{{ card.subtitle }}</p>
          </footer>
        </article>
        <!-- END Article -->
      </RouterLink>
      <!-- END Column -->
    </div>
  </div>
</template>
