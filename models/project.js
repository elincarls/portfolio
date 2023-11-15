import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        title: String,
        point_in_time: String,
        start_date: Date,
        end_date: Date,
        description: String,
        tags: Array,
        tldr: String,
        is_archived: Boolean
    },
    {
        timestamps: true
    }
    )

    const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

    export default Project; 