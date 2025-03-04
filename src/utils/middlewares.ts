import { NextFunction, Request, Response } from "express";
import HttpResponse from "./httpsResponse";

import {PostSchema,PostQueryParam} from "../model/post/post.interface";



export const validateRequest = (schema: any, target: 'body' | 'params' | 'query' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[target]);
      next();
    } catch (error) {
      const errorMessage = `Invalid request ${target}`;
      return next(HttpResponse.error(res, 400, errorMessage, 400, error));
    }
  };
};








 