import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  { sectionType: { type: String, required: true } },
  { discriminatorKey: "sectionType", _id: false },
);

const paragraphSchema = new mongoose.Schema({
  header: {
    type: String,
    required: false,
  },
  body: {
    type: [String],
    required: true,
  },
});

const imageSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    required: false,
  },
});

const bulletListSchema = new mongoose.Schema({
  body: {
    type: [String],
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  tldr: {
    type: String,
    required: false,
  },
  sections: [sectionSchema],
});

projectSchema.path("sections").discriminator("paragraph", paragraphSchema);
projectSchema.path("sections").discriminator("image", imageSchema);
projectSchema.path("sections").discriminator("bullet-list", bulletListSchema);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
