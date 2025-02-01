<template>
  <div class="login-container">
    <h2>Login / Criar Conta</h2>

    <!-- Campos do formulário -->
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required placeholder="ex: joao@example.com" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required placeholder="******" />

      <!-- Mensagem de erro -->
      <p v-if="erro" class="error-message">{{ erro }}</p>

      <!-- Botões -->
      <div class="buttons">
        <button type="button" @click="login" :disabled="!email || !password">Login</button>
        <button type="button" @click="criarConta" :disabled="!email || !password">Criar Conta</button>
      </div>
    </form>
  </div>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
      erro: ''
    };
  },
  methods: {
    async login() {
      try {
        const resposta = await authService.login(this.email, this.password);
        this.salvarSessao(resposta);
      } catch (error) {
        this.erro = error.response?.data?.error || "Credenciais inválidas.";
      }
    },
    async criarConta() {
      try {
        const username = this.email.split('@')[0]; // Gera username automático
        const resposta = await authService.criarConta(username, this.email, this.password);

        if (resposta && resposta.user) {
          await this.login(); // Faz login automaticamente após criação da conta
        } else {
          this.erro = "Erro inesperado ao criar conta.";
        }
      } catch (error) {
        this.erro = error.response?.data?.error || "Erro ao criar conta.";
      }
    },
    salvarSessao(dados) {
      localStorage.setItem("token", dados.token);
      localStorage.setItem("userId", dados.user._id);
      localStorage.setItem("username", dados.user.username);
      
      this.$router.push("/");  // Redireciona para a home
      setTimeout(() => {
        window.location.reload(); // Garante que o nome do usuário apareça corretamente
      }, 100); // Pequeno delay para garantir que o redirecionamento ocorra antes do refresh
    }
  }
};
</script>
