import { Request, ResponseToolkit } from "hapi";
import * as Joi from "@hapi/joi";

export const getRoadmaps = {
  options: {
    auth: "jwt",

    validate: {
      payload: Joi.object({}),

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
    } catch (error) {
      return error.message;
    }
  },
};

export const createRoadmap = {
  options: {
    auth: "jwt",

    validate: {
      payload: Joi.object({}),

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
    } catch (error) {
      return error.message;
    }
  },
};

export const getRoadmapById = {
  options: {
    auth: "jwt",

    validate: {
      payload: Joi.object({}),

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
    } catch (error) {
      return error.message;
    }
  },
};

export const updateroadmapbyid = {
  options: {
    auth: "jwt",

    validate: {
      payload: Joi.object({}),

      failaction: (
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
    } catch (error) {
      return error.message;
    }
  },
};

export const deleteRoadmapById = {
  options: {
    auth: "jwt",

    validate: {
      payload: Joi.object({}),

      failaction: (
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
    } catch (error) {
      return error.message;
    }
  },
};
