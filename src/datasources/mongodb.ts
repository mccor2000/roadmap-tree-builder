import * as Mongoose from "mongoose";

export const plugin = {
  register: (_plugin: any, options: any) => {
    Mongoose.connect(
      options.uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );

    Mongoose.connection.on("connected", () => {
      console.log("Mongoose connected");
    });

    Mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });

    process.on("SIGINT", () => {
      Mongoose.connection.close(() => {
        console.log("Mongoose disconnected due to app termination");
        process.exit(0);
      });
    });
  },
  pkg: require("../../package.json"),
  name: "mongoose",
};
