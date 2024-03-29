import mongoose from "mongoose";
const { Schema, model } = mongoose;

const quizTypeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description : {
      type : String,
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

const QuizType = model("QuizType", quizTypeSchema);
export default QuizType;


