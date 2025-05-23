import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    image: { type: String,require:true},
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

// Correct ES module export
const hospitalModel = mongoose.model("hospital", hospitalSchema);
export default hospitalModel;