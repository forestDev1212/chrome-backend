import mongoose from "mongoose";
const { Schema, model } = mongoose;

const levelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    delFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Level = model("Level", levelSchema);
export default Level;
