// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'H4rD2Gu3ssK3y!f0rJWT12345678';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Non autorisé
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Accès interdit
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
