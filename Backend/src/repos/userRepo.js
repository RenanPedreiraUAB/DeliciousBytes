const User = require('../models/User');

module.exports = {
  /**
   * Cria um novo user
   * @param {Object} userData Objeto contendo { username, email, password }
   * @returns user criado
   */
  async createUser(userData) {
    return await User.create(userData);
  },

  /**
   * Busca um user pelo ID
   * @param {string} userId
   * @returns user ou null
   */
  async findUserById(userId) {
    return await User.findById(userId);
  },

  /**
   * Busca um user pelo email
   * @param {string} email
   * @returns user ou null
   */
  async findUserByEmail(email) {
    return await User.findOne({ email });
  },

  /**
   * (Opcional) Atualiza dados de user, caso precise
   */
  async updateUser(userId, newData) {
    return await User.findByIdAndUpdate(userId, newData, { new: true });
  },

  /**
   * (Opcional) Remove um user (cuidado com o cascade de dados, se houver)
   */
  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }
};
