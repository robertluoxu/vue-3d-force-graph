import { createApp } from 'vue'
import App from './App.vue'
import { VueForceGraph3D, VueForceGraph2D } from "vue-force-graph";


const app = createApp(App)
app.use(VueForceGraph3D).use(VueForceGraph2D)
app.mount('#app')