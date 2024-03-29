import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    delFlag : {
      type : Boolean,
      default : false
    }
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
export default Category;


