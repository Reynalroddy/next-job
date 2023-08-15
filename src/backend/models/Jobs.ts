import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salaryFromRange: {
      type: Number,
      required: false,
    },
    salaryToRange: {
      type: Number,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// delete old model
if (mongoose.models.jobs) {
  const jobModel = mongoose.model("jobs");
  mongoose.deleteModel(jobModel.modelName);
}

// create new model
const Job = mongoose.model("jobs", jobSchema);
export default Job;