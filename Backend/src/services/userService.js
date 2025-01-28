const bcrypt = require('bcrypt');
const userRepo = require('../repos/userRepo');

module.exports = {
  /**
   * Regista um novo utilizador.
   * @param {Object} userData Objeto contendo { username, email, password }
   */
  async registerUser({ username, email, password }) {
    // Verificar se o email já existe
    const existingUser = await userRepo.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Encriptar a password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o utilizador
    const newUser = await userRepo.createUser({
      username,
      email,
      password: hashedPassword
    });

    return newUser;
  },

  /**
   * Valida as credenciais de um utilizador (login).
   * @param {string} email Email do utilizador
   * @param {string} password Password do utilizador
   */
  async validateUserCredentials(email, password) {
    // Buscar utilizador pelo email
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Comparar password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Em caso de sucesso, retornamos o user
    return user;
  }
};
