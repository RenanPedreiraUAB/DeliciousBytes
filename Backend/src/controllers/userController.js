const userService = require('../services/userService');
const jwt = require('jsonwebtoken'); // 1) Importar jsonwebtoken

module.exports = {
  // Registo de utilizador
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await userService.registerUser({ username, email, password });

      return res.status(201).json({
        message: 'User registered successfully',
        user: newUser
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Login de utilizador
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 2) Validar credenciais
      const user = await userService.validateUserCredentials(email, password);

      // 3) Gerar o token JWT. Use uma variável de ambiente para a secret, se possível
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET || 'delicousbytessecretkey123'//, 
        //{ expiresIn: '1h' }
      );

      // 4) Retornar o token juntamente com os dados do utilizador
      return res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        },
        token: token
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
};