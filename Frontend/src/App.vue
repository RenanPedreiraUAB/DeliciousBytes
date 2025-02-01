<template>
  <div class="app-container">
    <HeaderComponent />
    <main>
      <router-view class="content" />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>

<style>
/* Estilos para manter o layout fixo */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* Container da aplicação, mantém tudo organizado */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Header sempre no topo */
header {
  flex-shrink: 0;
}

/* O conteúdo central ocupa o espaço disponível */
main {
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  justify-content: center; /* Centraliza a view */
}

.content {
  width: 90%; /* Ocupa 90% da largura da tela */
  background: var(--color-light);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Footer sempre fixo no final */
footer {
  flex-shrink: 0;
  text-align: center;
  background: var(--color-primary);
  color: var(--color-light);
  padding: 1rem;
}
</style>
