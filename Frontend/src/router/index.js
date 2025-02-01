import { createRouter, createWebHistory } from 'vue-router';

// Importando os componentes das páginas
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import RecipeCreate from '../views/RecipeCreate.vue'; // Nova view para criação
import RecipeEdit from '../views/RecipeEdit.vue'; // Nova view para edição

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/recipe/:id', component: RecipeDetails },
  { path: '/recipe-create', component: RecipeCreate }, // Rota para criação
  { path: '/recipe-edit/:id', component: RecipeEdit }  // Rota para edição
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
