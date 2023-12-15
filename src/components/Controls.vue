<script setup lang="ts">
import { Panel, useVueFlow } from "@vue-flow/core";
import { useRoute } from "vue-router";

const route = useRoute()
const flowKey = route.params.id;

const {
  nodes,
  addNodes,
  setNodes,
  setEdges,
  dimensions,
  setTransform,
  toObject,
} = useVueFlow();

function onSave() {
  // @ts-ignore
  localStorage.setItem(flowKey, JSON.stringify(toObject()));
}

function onRestore() {
  // @ts-ignore
  const flow = JSON.parse(localStorage.getItem(flowKey));

  if (flow) {
    const [x = 0, y = 0] = flow.position;
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setTransform({ x, y, zoom: flow.zoom || 0 });
  }
}

function onAdd() {
  const id = nodes.value.length + 1;

  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: {
      x: Math.random() * dimensions.value.width,
      y: Math.random() * dimensions.value.height,
    },
  };

  addNodes([newNode]);
}
</script>

<template>
  <Panel position="top-right" class="save-restore-controls">
    <button class="text-white bg-blue-500 border p-2" @click="onSave">Saqlash</button>
    <button class="text-white bg-blue-500 border p-2" @click="onRestore">
      O'chirish
    </button>
    <button class="text-white bg-blue-500 border p-2" @click="onAdd">Yangi element qo'shish</button>
  </Panel>
</template>
