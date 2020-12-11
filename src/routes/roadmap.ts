import { Server } from "@hapi/hapi";
import { Options } from "glue";

export const plugin = {
  pkg: require("../../package.json"),
  name: "roadmap_routes",
  register: async (server: Server, _options: Options) => {
    const Controllers = require("../controllers/roadmap");

    server.route([
      {
        method: "GET",
        path: "/roadmaps",
        ...Controllers.getRoadmaps,
      },
      {
        method: "POST",
        path: "/roadmaps",
        ...Controllers.createRoadmap,
      },
      {
        method: "GET",
        path: "/roadmaps/{id}",
        ...Controllers.getRoadmapById,
      },
      {
        method: "PUT",
        path: "/roadmaps/{id}",
        ...Controllers.updateRoadmapById,
      },
      {
        method: "DELETE",
        path: "/roadmaps/{id}",
        ...Controllers.deleteRoadmapById,
      },
    ]);
  },
};
