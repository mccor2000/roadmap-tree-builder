import * as dotenv from "dotenv";
dotenv.config();

import * as Manifest from "./config/manifest";
import * as Glue from "glue";

const composerOptions = {
  relativeTo: __dirname,
};

(async function () {
  try {
    const server = await Glue.compose(Manifest.get("/"), composerOptions);

    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
