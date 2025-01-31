<template>
  <header>
    <h1>Delicious Bytes</h1>
    <div class="user-info" @click="toggleUserMenu">
      <svg class="user-icon" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M12 14c-4.3 0-8 2.3-8 4v2h16v-2c0-1.7-3.7-4-8-4z"></path>
      </svg>
      <span v-if="username">{{ username }}</span>
      <span v-else>Login</span>
    </div>

    <!-- 🔽 Popup de Logout -->
    <div v-if="mostrarMenu" class="user-menu">
      <button @click="logout">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username") || null,
      mostrarMenu: false
    };
  },
  mounted() {
    // Atualiza o username quando o localStorage mudar
    window.addEventListener("storage", this.updateUsername);
  },
  beforeUnmount() {
    // Remove o listener ao desmontar o componente
    window.removeEventListener("storage", this.updateUsername);
  },
  methods: {
    toggleUserMenu() {
      if (!this.username) {
        this.$router.push("/login");
      } else {
        this.mostrarMenu = !this.mostrarMenu;
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      
      this.username = null;
      this.mostrarMenu = false;
      
      this.$router.push("/login");
      setTimeout(() => {
        window.location.reload(); // 🔄 Atualiza a página para limpar o estado corretamente
      }, 100);
    },
    updateUsername() {
      this.username = localStorage.getItem("username"); // Atualiza dinamicamente
    }
  }
};
</script>

<style scoped>
header {
  background: var(--color-primary);
  color: var(--color-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-icon {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.user-menu {
  position: absolute;
  top: 60px;
  right: 10px;
  background: var(--color-light);
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.user-menu button {
  background: var(--color-primary);
  color: var(--color-light);
  padding: 0.5rem;
  border: none;
  cursor: pointer;
}
.user-menu button:hover {
  opacity: 0.9;
}
</style>
