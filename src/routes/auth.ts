import { Server } from "@hapi/hapi";
import { Options } from "glue";

export const plugin = {
  pkg: require("../../package.json"),
  name: "auth_routes",
  register: async (server: Server, _options: Options) => {
    const Controllers = require("../controllers/auth");

    server.route([
      {
        method: "POST",
        path: "/auth/login",
        ...Controllers.login,
      },
      {
        method: "POST",
        path: "/auth/signup",
        ...Controllers.signup,
      },
    ]);
  },
};
