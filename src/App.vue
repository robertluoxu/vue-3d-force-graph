<!--
<script setup>
  import { ref } from "vue";
  import * as THREE from "three";
  const imgs = [
    "cat.jpg",
    "dog.jpg",
    "eagle.jpg",
    "elephant.jpg",
    "grasshopper.jpg",
    "octopus.jpg",
    "owl.jpg",
    "panda.jpg",
    "squirrel.jpg",
    "tiger.jpg",
    "whale.jpg",
  ];

  // Random connected graph
  const graphData = ref({
    nodes: imgs.map((img, id) => ({ id, img })),
    links: Array.from(Array(imgs.length).keys())
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  });
  const nodeThreeObject = ({ img }) => {
    const imgTexture = new THREE.TextureLoader().load(`/images/${img}`);
    const material = new THREE.SpriteMaterial({ map: imgTexture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(12, 12);
    return sprite;
  };
</script>

<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
    :nodeThreeObject="nodeThreeObject"
  ></VueForceGraph3D>
</template>
-->

<script setup>
import { onMounted, ref } from "vue";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
const extraRenderers = [new CSS2DRenderer()];
const graphData = ref({
  nodes: [],
  links: [],
});
const fgRef = ref();
fetch("/miserables.json")
  .then((res) => res.json())
  .then((data) => (graphData.value = data));

onMounted(() => {
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 3;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    fgRef.value.postProcessingComposer().addPass(bloomPass);
  });
function nodeThreeObject(node) {
  const nodeEl = document.createElement("div");
  nodeEl.textContent = node.name;
  nodeEl.style.color = node.color;
  nodeEl.className = "node-label";
  return new CSS2DObject(nodeEl);
}
function onHandleClick(node){
  // Aim at node from outside it
  const distance = 40;
  const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  fgRef.value.cameraPosition(
    { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
    node, // lookAt ({ x, y, z })
    3000 // ms transition duration
  );
  console.log('111111111111111111',node);
  window.alert(`node.id:${node.id},node.name:${node.name}`)
}
</script>
<template>
  <VueForceGraph3D
    ref="fgRef"
    :extraRenderers="extraRenderers"
    :graphData="graphData"
    backgroundColor="#090723"
    nodeAutoColorBy="group"
    :nodeThreeObject="nodeThreeObject"
    :nodeThreeObjectExtend="true"
    :onNodeClick="onHandleClick"
  ></VueForceGraph3D>
</template>
<style>
.node-label {
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  user-select: none;
}
</style>