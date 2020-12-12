import { Request, ResponseToolkit } from "hapi";
import * as Joi from "@hapi/joi";

import * as RoadmapServices from "../services/roadmap";
import handleValidationError from "../helpers/handleValidationError";

export const getRoadmaps = {
  options: {
    auth: "jwt",
    validate: {
      query: Joi.object({
        limit: Joi.number().integer().min(1).max(100).default(10),
      }),
      failAction: handleValidationError,
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await RoadmapServices.getRoadmaps(
        request.auth.credentials,
        request.query
      );

      return h
        .response({ data: serviceResponse.data })
        .code(serviceResponse.statusCode);
    } catch (error) {
      return error.message;
    }
  },
};

export const createRoadmap = {
  options: {
    auth: "jwt",

    validate: {
      payload: Joi.object({
        name: Joi.string().max(128).required(),
        overview: Joi.string(),
        fieldName: Joi.string(),
        subjectName: Joi.string(),
        isPrivate: Joi.boolean().required(),
      }),

      failAction: handleValidationError,
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await RoadmapServices.createRoadmap(
        request.auth.credentials,
        request.payload
      );
      console.log(serviceResponse);

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

export const getRoadmapById = {
  options: {
    auth: "jwt",

    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),

      failAction: handleValidationError,
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await RoadmapServices.getRoadmapById(
        request.auth.credentials,
        request.params.id
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

export const updateRoadmapById = {
  options: {
    auth: "jwt",

    validate: {
      failAction: handleValidationError,
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await RoadmapServices.updateRoadmapById(
        request.auth.credentials,
        request.params.id,
        request.payload
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

export const deleteRoadmapById = {
  options: {
    auth: "jwt",

    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),

      failAction: handleValidationError,
    },
  },

  handler: async (request: Request, h: ResponseToolkit) => {
    try {
      const serviceResponse = await RoadmapServices.deleteRoadmapById(
        request.auth.credentials,
        request.params.id
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
