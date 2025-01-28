const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Se não existir cabeçalho, rejeita
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Formato esperado: "Bearer token"
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  // Verifica o token com a secret
  jwt.verify(
    token,
    process.env.JWT_SECRET || 'delicousbytessecretkey123',
    (err, decoded) => {
      if (err) {
        console.log(err); // <-- Adicione para ver detalhes
        return res.status(401).json({ error: 'Token invalid' });
      }

      // Atribui o userId ao req
      req.userId = decoded.userId;

      return next();
    }
  );
};
