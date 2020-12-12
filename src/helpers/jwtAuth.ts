import { Request, Server } from "@hapi/hapi";

export const plugin = {
  register: (server: Server, options: any) => {
    server.auth.strategy("jwt", "jwt", {
      key: options.key,
      validate: async (decoded: any, request: Request) => {
        if (!decoded.id) return { isValid: false };

        request.auth.credentials = decoded;
        return { isValid: true };
      },
      verifyOptions: {
        algorithms: options.algorithm,
      },
    });
  },
  pkg: require("../../package.json"),
  name: "jwt-auth",
};
