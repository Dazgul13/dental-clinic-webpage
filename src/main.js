import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'
import 'leaflet/dist/leaflet.css'
import inView from './directives/inView'
import gsapAnimate from './directives/gsapAnimate'
import router from './router'

const app = createApp(App)
app.directive('inview', inView)
app.directive('gsapanimate', gsapAnimate)
app.use(router)
app.mount('#app')
