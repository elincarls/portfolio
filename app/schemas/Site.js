import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  me: {
    header: { type: String },
    body: { type: [String] },
  },
  contact: {
    header: { type: String },
    subheader: { type: String },
    form: { type: mongoose.Schema.Types.Mixed },
  },
}, { collection: "site" });

export default mongoose.models.Site ||
  mongoose.model("Site", siteSchema);
