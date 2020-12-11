import * as Confidence from "confidence";
import * as Config from "./config";

let internals: any = {
  criteria: {
    env: process.env.NODE_ENV,
  },

  manifest: {
    $meta: "App manifest document",
    server: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
    register: {
      plugins: [
        /* DATASOURCES */
        {
          plugin: "./datasources/mongodb",
          options: Config.get("/mongodb"),
        },

        /* AUTHENTICATION */
        {
          plugin: "hapi-auth-jwt2",
        },
        {
          plugin: "./helpers/jwtAuth",
          options: Config.get("/jwtAuthOptions"),
        },

        /* APIs */
        {
          plugin: "./routes/auth",
        },
      ],
    },
  },
};

internals.store = new Confidence.Store(internals.manifest);

export const get = (key: string) =>
  internals.store.get(key, internals.criteria);

export const meta = (key: string) =>
  internals.store.meta(key, internals.criteria);
