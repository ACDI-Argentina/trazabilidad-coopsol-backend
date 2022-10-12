
import Boom from '@hapi/boom';
import * as express from 'express';

interface AuthOptions {
  users: {
    [key: string]: string | undefined
  }
}

function authenticationMiddleware(options: AuthOptions): express.RequestHandler {

  return (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization?.startsWith("Basic")) {
      return next(Boom.unauthorized('Unauthorized'));
    }
    const encoded = authorization?.split("Basic ")[1];
    const decoded = Buffer.from(encoded!, 'base64').toString('ascii');
    const [user, password] = decoded.split(":");

    const localPwd = options.users[user];
    if (!localPwd || localPwd !== password) {
      return next(Boom.unauthorized('Unauthorized'));
    }
    next();

  };
}

export default authenticationMiddleware;