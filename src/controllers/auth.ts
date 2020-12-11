import { Request, ResponseToolkit } from "hapi";
import * as Joi from "@hapi/joi";

import { User } from "../models/user";
import * as AuthService from "../services/auth";

export const signup = {
  options: {
    auth: false,

    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        displayName: Joi.string().max(64).required(),
      }),

      failAction: (
        _request: Request,
        h: ResponseToolkit,
        error: Joi.ValidationError
      ) => {
        return h
          .response({ message: error.details[0].message.replace(/['"]+/g, "") })
          .code(400)
          .takeover();
      },
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await AuthService.signupUser(
        <User>request.payload
      );

      return h
        .response({
          message: serviceResponse.message,
          data: serviceResponse.data,
        })
        .code(serviceResponse.statusCode);
    } catch (error) {
      return error.message;
    }
  },
};

export const login = {
  options: {
    auth: false,

    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),

      failAction: (
        _request: Request,
        h: ResponseToolkit,
        error: Joi.ValidationError
      ) => {
        return h
          .response({ message: error.details[0].message.replace(/['"]+/g, "") })
          .code(400)
          .takeover();
      },
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await AuthService.loginUser(
        request.payload as { email: string; password: string }
      );

      return h
        .response({
          message: serviceResponse.message,
          data: serviceResponse.data,
        })
        .code(serviceResponse.statusCode);
    } catch (error) {
      return error.message;
    }
  },
};
