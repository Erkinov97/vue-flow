<script setup lang="ts">
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { ref } from "vue";

const { addEdges, addNodes, removeNodes } = useVueFlow();

const { applyNodeChanges } = useVueFlow();

// const { confirm } = useConfirm();

const elements = ref([
  {
    id: "1",
    label: "Node 1",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    label: "Node 2",
    position: { x: 100, y: 100 },
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
]);

const onNodesChange = (changes: any) => {
  changes.forEach(async (change: any) => {
    // if the change is a remove change, we want to validate it first
    if (change.type === "remove") {
      const isConfirmed = await confirm();

      if (isConfirmed) {
        // if confirmed, apply the change
        applyNodeChanges([change]);
      }
    } else {
      // apply all other changes
      applyNodeChanges([change]);
    }
  });
};
</script>
<template>
  <div style="height: 100vh">
    <!-- <VueFlow
      v-model="elements"
      :apply-changes="false"
      @nodes-change="onNodesChange"
    /> -->

    <VueFlow
      :addEdges="addEdges"
      v-model="elements"
      :apply-changes="false"
      @nodes-change="onNodesChange"
    >
      <Background pattern-color="#aaa" :gap="8" />

      <MiniMap />

      <Controls />
    </VueFlow>
  </div>
</template>
