import { Request, Server } from "@hapi/hapi";

export const plugin = {
  register: (server: Server, options: any) => {
    server.auth.strategy("jwt", "jwt", {
      key: options.key,
      validate: async (decoded: any, _request: Request) => {
        if (!decoded.id) return { isValid: false };

        return { isValid: true };
      },
      verifyOptions: {
        algorithms: options.algorithm,
      },
    });

    server.register;
  },
  pkg: require("../../package.json"),
  name: "jwt-auth",
};
