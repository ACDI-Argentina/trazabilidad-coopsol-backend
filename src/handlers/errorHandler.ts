import { Request, Response, NextFunction, Router } from "express";
import Boom from '@hapi/boom';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if(Boom.isBoom(err)){    
    return res.status(err.output.statusCode).json(err.output.payload);
  } else {
    console.log("Error handling")
    console.error(err.stack)
    res.status(500).send({
      error: err.name,
      message: err.message,
      stack: process.env.NODE_ENV !=="production" ? err.stack: undefined 
    });
  }
}