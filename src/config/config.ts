import * as Confidence from "confidence";

let internals: any = {
  criteria: {
    env: process.env.NODE_ENV,
  },
};

internals.config = {
  $meta: "App configuration file",
  port: {
    $filter: "env",
    development: 3000,
    production: process.env.PORT,
    $default: 8000,
  },
  baseUrl: {
    $filter: "env",
    $meta: "Value should not end in '/'",
    production: "http://localhost:8000",
    $default: "http://127.0.0.1:8000",
  },
  mongodb: {
    $filter: "env",
    development: {
      uri: "mongodb://localhost:27017/testdb",
    },
    production: {
      uri: process.env.MONGODB_URL,
    },
    $default: {
      uri: process.env.MONGODB_URL,
      options: {},
    },
  },
  jwtAuthOptions: {
    key: process.env.JWT_SECRET,
    algorithm: "HS256",
  },
};

internals.store = new Confidence.Store(internals.config);

export const get = (key: string) =>
  internals.store.get(key, internals.criteria);

export const meta = (key: string) =>
  internals.store.meta(key, internals.criteria);
