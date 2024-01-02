//import jwt from 'express-jwt';
const { expressjwt: jwt } = require('express-jwt'); // fix
import config from '../../../config';

const getTokenFromHeader = req => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
  algorithms: ['HS256'], // Use the HMAC SHA-256 algo to sign the JWT
});

function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const authorizeRole = (requiredRoles) => (req, res, next) => {
  const token = parseJwt(getTokenFromHeader(req));
  const userRole = token.role;
  
  if (userRole && requiredRoles.includes(userRole)) {
    next();
  } else {
    res.status(403).send('Permission denied. Your role is ' + userRole + ', you must have one of the following roles: ' + requiredRoles.join(', ') + '.');
  }
};

export { isAuth, authorizeRole };
