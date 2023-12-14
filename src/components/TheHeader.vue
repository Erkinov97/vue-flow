<script setup lang="ts">
import AddIcon from "@/components/icons/add.vue";
import PenIcon from "@/components/icons/pen.vue";
import TrashIcon from "@/components/icons/trash.vue";

const emit = defineEmits<{
  (e: "addFlow"): void;
  (e: "editNode"): void;
  (e: "deleteNode"): void;
  (e: "deleteEdge"): void;
}>();

function addItem() {
  console.log("add item");
  emit("addFlow");
}

function editItem() {
  emit("editNode");
}

function deleteItem() {
  emit("deleteNode");
}
function deleteLine() {
  console.log("delete item");
  emit("deleteEdge");
}
</script>
<template>
  <header
    class="bg-white z-10 fixed top-0 left-0 right-0 w-full py-4 shadow-xl"
  >
    <nav class="px-6">
      <ul class="flex items-center justify-center gap-4">
        <li>
          <button type="button" class="h-6 w-6" @click="addItem">
            <AddIcon />
          </button>
        </li>
        <li>
          <button type="button" class="h-6 w-6" @click="editItem">
            <PenIcon />
          </button>
        </li>
        <li>
          <button type="button" class="h-6 w-6" @click="deleteItem">
            <TrashIcon />
          </button>
        </li>
        <li>
          <button type="button" class="h-6 w-6" @click="deleteLine">
            <TrashIcon />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
