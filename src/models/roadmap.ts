import * as Mongoose from "mongoose";

export interface RoadmapNode extends Mongoose.Document {
  title: string;

  overview: string;

  isRoot: boolean;

  children: [string];
}

export interface Roadmap extends Mongoose.Document {
  title: string;

  overview: string;

  fieldName: string;

  subjectName: string;

  owner: string;

  nodes: [RoadmapNode];
}

const RoadmapNodeSchema = new Mongoose.Schema({
  title: { type: String },

  overview: { type: String },

  isRoot: { type: Boolean },

  children: { type: [String] },
});

const RoadmapSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },

    overview: { type: String },

    fieldName: { type: String, required: true },

    subjectName: { type: String, required: true },

    owner: { type: Mongoose.Schema.Types.ObjectId, ref: "users" },

    nodes: { type: [RoadmapNodeSchema] },
  },
  { timestamps: true }
);

export default Mongoose.model("Roadmap", RoadmapSchema, "roadmaps");
