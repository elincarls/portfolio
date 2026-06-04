import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  me: {
    header: { type: String },
    body: { type: [String] },
  },
  contact: {
    header: { type: String },
    subheader: { type: String },
  },
  banner: {
    enabled: { type: Boolean, default: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    link: {
      label: { type: String, required: false },
      href: { type: String, required: false },
    },
  },
}, { collection: "site" });

export default mongoose.models.Site ||
  mongoose.model("Site", siteSchema);
