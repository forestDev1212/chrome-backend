import mongoose from "mongoose";

const { Schema, model } = mongoose;

const quizSchema = new Schema(
  {
    quizType : {
      type : String,
      required : true,
    },
    category : {
      type : Schema.Types.ObjectId,
      ref : "Category",
      required : true,
    },
    level : {
      type : Schema.Types.ObjectId,
      ref : "User",
      required : true,
    },
    questionText : {
      type : String
    },
    answerTexts : [{
      type : String
    }],
    correctAnswerText : {
      type : String
    },
    questionAudio : {
      type : Schema.Types.ObjectId,
    },
    answerAudios : [
      {
      type : Schema.Types.ObjectId,
    }
    ],
    correctAnswerAudio : {
      type : String
    },


  },
  {
    timestamps: true,
  }
);

const Quiz = model("Quiz", quizSchema);
export default Quiz;


