<script setup lang="ts">
import { VueFlow, addEdge, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { onMounted, reactive, ref, watch } from "vue";
import SaveRestoreControls from "@/components/Controls.vue";
import { useRoute } from "vue-router";
import TrashIcon from "@/components/icons/trash.vue";


type selectedNodeType = {
  id: string
}
const { addEdges, getNode } = useVueFlow();
const { applyNodeChanges } = useVueFlow();
const route = useRoute()
const flowKey = route.params.id || '';
 // @ts-ignore
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
const elements = ref(localFlow && [...localFlow.nodes, ...localFlow.edges] || [
  { id: "1", label: "Node 1", position: { x: 209, y: 4 }, class: "light" }]);

const onConnect = (params: any) => {
  addEdge(params, elements.value);
};



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


function updateNode() {
  console.log('update')
  // @ts-ignore
  if (selectedNode.value?.id) {
    // @ts-ignore
    const node = getNode.value(selectedNode.value?.id)
    // @ts-ignore
    node.label = opts.label.trim() !== '' ? opts.label : '-'
    // @ts-ignore
    node.style = { backgroundColor: opts.bg }
    // @ts-ignore
    node.hidden = opts.hidden
  }
}

onMounted(() => {
  const elements = getElements();

  if (elements) {
    elements.value = elements;
  }
});
function onNodeClick(event: any) {
  console.log("onNodeClick event", event.node);
  // @ts-ignore
  selectedNode.value.id = event.node.id;
  const node = getNode.value(event.node.id)
  // @ts-ignore
  opts.label = node.label;
  // @ts-ignore
  opts.bg = node.bg;
}
function onEdgeClick(event: any) {
  console.log("onEdgeClick event", event.edge);
  selectedEdge.value = event.edge;
}


function deleteNodeItem() {
  console.log('delete')
  // @ts-ignore
  if (selectedNode.value?.id) {
    // @ts-ignore
    const node = getNode.value(selectedNode.value?.id)
    // @ts-ignore
    const index = elements.value.findIndex((el) => el.id === node.id)
    elements.value.splice(index, 1)
  }

}
// after delete node, update local storage and elements state value 



onMounted(() => {
  elements.value[2]
})
watch(() => elements.value, () => {
  console.log('changed', elements.value)
})
</script>
<template>
  <div style="height: 98vh">
    <VueFlow :addEdges="addEdges" v-model="elements" :apply-changes="false" @connect="onConnect"
      @nodes-change="onNodesChange" :default-viewport="{ zoom: 1, x: 550, y: 100 }" :max-zoom="4" :min-zoom="0.1"
      @edge-click="onEdgeClick" @node-click="onNodeClick">
      <div class="updatenode__controls">
        <label>label:</label>
        <input class="border" v-model="opts.label" @input="updateNode" />

        <label class="mt-2">background:</label>
        <input class="w-full" v-model="opts.bg" type="color" @input="updateNode" />

        <div class="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input v-model="opts.hidden" type="checkbox" @change="updateNode" />
        </div>

        <button type="button" class="h-6 w-6" @click="deleteNodeItem">
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
  top: 60px;
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
