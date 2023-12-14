<script setup lang="ts">
import { VueFlow, addEdge, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import {onMounted, reactive, ref, watch} from "vue";
import TheHeader from "@/components/TheHeader.vue";
import SaveRestoreControls from "@/components/Controls.vue";
import {useRoute} from "vue-router";
import TrashIcon from "@/components/icons/trash.vue";


type selectedNodeType = {
  id: string
}
const { addEdges, addNodes, getNode } = useVueFlow();
const { applyNodeChanges } = useVueFlow();
const route = useRoute()
const flowKey = route.params.id || '';
const localFlow = localStorage.getItem(flowKey) && JSON.parse(localStorage.getItem(flowKey))

const opts = reactive({
  bg: "#eeeeee",
  label: "Node 1",
  hidden: false,
});
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
const elements = ref([...localFlow.nodes, ...localFlow.edges] || [
  { id: "1", label: "Node 1", position: { x: 209, y: 4 }, class: "light" },
  { id: "2", label: "Node 2", position: { x: 208, y: 132 }, class: "light" },
  { id: "3", label: "Node 3", position: { x: 110, y: 235 }, class: "light" },
  { id: "4", label: "Node 4", position: { x: 319, y: 235 }, class: "light" },

  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Updateable edge",
    updatable: true,
  },
]);

const onConnect = (params: any) => {
  addEdge(params, elements.value);
};

// add node
// function onAdd() {
//   const id = nodes.value.length + 1;

//   const newNode = {
//     id: `random_node-${id}`,
//     label: `Node ${id}`,
//     position: {
//       x: Math.random() * dimensions.value.width,
//       y: Math.random() * dimensions.value.height,
//     },
//   };

//   addNodes([newNode]);
// }

// nodes data
const nodes = ref([
  {
    id: "1",
    label: "Node 1",
    position: { x: 209, y: 4 },
    class: "light",
  },
  {
    id: "2",
    label: "Node 2",
    position: { x: 208, y: 132 },
    class: "light",
  },
  {
    id: "3",
    label: "Node 3",
    position: { x: 110, y: 235 },
    class: "light",
  },
]);

// create a new node when the user double clicks on the canvas
function addFlow(event: any) {
  // const id = nodes.value.length + 1;

  // const newNode = {
  //   id: `random_node-${id}`,
  //   label: `Node ${id}`,
  //   position: {
  //     x: Math.random() * dimensions.value.width,
  //     y: Math.random() * dimensions.value.height,
  //   },
  // };

  // addNodes([newNode]);
  const { position } = event;

  const newNode = {
    id: `random_node-${nodes.value.length + 1}`,
    label: opts.label,
    position,
  };

  addNodes([newNode]);
}

// get elements in local storage
function getElements() {
  const elements = localStorage.getItem("example-flow");

  if (elements) {
    return JSON.parse(elements);
  }

  return [];
}

const selectedEdge = ref(null);
const selectedNode = ref<selectedNodeType | {}>({});

// edit node
function editNode() {

}


function updateNode() {
  console.log('update')
  if(selectedNode.value?.id) {
    const node = getNode.value(selectedNode.value?.id)
    node.label = opts.label.trim() !== '' ? opts.label : '-'
    node.style = { backgroundColor: opts.bg }
    node.hidden = opts.hidden
  }
}

// delete node
function deleteNode() {
  // delete flow
}
function deleteEdge() {}

onMounted(() => {
  const elements = getElements();

  if (elements) {
    elements.value = elements;
  }
});
function onNodeClick(event: any) {
  console.log("onNodeClick event", event.node);
  selectedNode.value.id = event.node.id;
  const node = getNode.value(event.node.id)
  opts.label = node.label;
  opts.bg = node.bg;
 }
function onEdgeClick(event: any) {
  console.log("onEdgeClick event", event.edge);
  selectedEdge.value = event.edge;
}

onMounted(() => {
  elements.value[2]
})
watch(() => elements.value, () => {
  console.log('changed', elements.value)
})
</script>
<template>
  <TheHeader
    @add-flow="addFlow"
    @edit-node="editNode"
    @delete-edge="deleteEdge"
    @delete-node="deleteNode"
  />
  <div class="pt-16" style="height: 98vh">
    <VueFlow
      :addEdges="addEdges"
      v-model="elements"
      :apply-changes="false"
      @connect="onConnect"
      @nodes-change="onNodesChange"
      :default-viewport="{ zoom: 1, x: 550, y: 100 }"
      :max-zoom="4"
      :min-zoom="0.1"
      @edge-click="onEdgeClick"
      @node-click="onNodeClick"
    >
      <div class="updatenode__controls">
        <label>label:</label>
        <input class="border" v-model="opts.label" @input="updateNode"/>

        <label class="updatenode__bglabel">background:</label>
        <input v-model="opts.bg" type="color" @input="updateNode" />

        <div class="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input v-model="opts.hidden" type="checkbox" @change="updateNode" />
        </div>

        <button type="button" class="h-6 w-6">
          <TrashIcon />
        </button>
      </div>
      <SaveRestoreControls />
      <Background pattern-color="#aaa" :gap="8" />
      <MiniMap />
      <Controls />
    </VueFlow>
  </div>
</template>

<style>
.updatenode__controls {
  position: absolute;
  right: 10px;
  top: 40px;
  z-index: 4;
  font-size: 11px;
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 8px;
}
.updatenode__controls label {
  display: blocK;
}
.updatenode__controls input {
  padding: 2px;
  border-radius: 5px;
}
.updatenode__bglabel {
  margin-top: 8px;
}
.updatenode__checkboxwrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}
</style>
