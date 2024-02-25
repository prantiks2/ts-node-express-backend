import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function joiValidationMiddleware(schema: Joi.ObjectSchema, property: 'body' | 'params') {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error }  = schema.validate(req[property]);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        res.status(422).json({
          message: message.replace(/[\\"]/g, ""),
          data: req[property],
        })
      }
    }
  }