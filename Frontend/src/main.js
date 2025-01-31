import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o sistema de rotas
import './assets/styles.css'; // Importamos um CSS global

const app = createApp(App);
app.use(router);
app.mount('#app');
