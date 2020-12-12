import { Request, ResponseToolkit } from "@hapi/hapi";
import * as Joi from "@hapi/joi";

export default (
  _request: Request,
  h: ResponseToolkit,
  error: Joi.ValidationError
) => {
  return h
    .response({ message: error.details[0].message.replace(/['"]+/g, "") })
    .code(400)
    .takeover();
};
