import { NextFunction, Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { GenericObject, StatusCode } from "../types";
import { err, ok, Result } from "neverthrow";
import { response } from "../utils/response";

function requestValidator<T>(schema: Joi.ObjectSchema<any>, data: GenericObject): ValidationResult<T> {
  return schema.validate(data, { abortEarly: false, convert: false });
}

function createInstanceOrError<T>(schema: Joi.ObjectSchema<any>, data: GenericObject): Result<T, string> {
  const { error } = requestValidator<T>(schema, data);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join('. ');
    return err<T>(errors);
  }
  return ok<T>(data as T);
}


class ValidateRequestException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function validateRequest<T>(schema: Joi.ObjectSchema<T>){
    return (req: Request, res: Response, next: NextFunction) => {
        const validationResult = createInstanceOrError(schema, req.body);
        if (validationResult.isErr()) {
            const error = new ValidateRequestException(validationResult.error);
            return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        }
        next();
    }
}