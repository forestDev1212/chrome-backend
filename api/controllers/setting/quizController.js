import { Quiz } from "../../../models/index.js";
import mongoose from "mongoose";

const create = async (req, res) => {
  try {
    const data = req.body;
    const newDoc = new Quiz({
      ...data,
    });
    await newDoc.save();
    return res.json({
      success: true,
      message: "Successfully Created!",
    });
  } catch (err) {
    console.log("Error : ", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const result = await Quiz.find({
      delFlag: false,
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const listOne = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await Quiz.findOne({
      delFlag: false,
      _id: id,
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const listForQuizType = async (req, res) => {
  try {
    const { level, category, quizType } = req.query;
    const result = await Quiz.find({
      delFlag: false,
      level,
      category,
      quizType,
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;
    const { _id: id } = data;
    const updateResult = await Quiz.findByIdAndUpdate(id, data);
    if (!updateResult) {
      return res.status(404).json({
        success: false,
        message: "No Result with id: " + id,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully Updated!",
      });
    }
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.query;
    const removedResult = await Quiz.findByIdAndUpdate(id, {
      delFlag: true,
    });
    if (!removedResult) {
      return res.json({
        success: false,
        message: "No Result with id: " + id,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully removed.",
      });
    }
  } catch (err) {
    console.log("Error : ", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedResult = await Quiz.deleteOne(id);
    if (!deletedResult) {
      return res.json({
        success: false,
        message: "No Result with id: " + id,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully deleted.",
      });
    }
  } catch (err) {
    console.log("Error : ", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const quizForUser = async (req, res) => {
  try {
    const { level, category, quizType } = req.query;

    const randomQuizzes = await Quiz.aggregate([
      {
        $match: {
          level: mongoose.Types.ObjectId(level), // Match level ID
          category: mongoose.Types.ObjectId(category), // Match category ID
          quizType: quizType, // Match quizType
        },
      },
      { $sample: { size: 3 } },
    ]);

    // Array to store modified quizzes
    const modifiedQuizzes = [];

    // Loop through each random quiz
    for (const quiz of randomQuizzes) {
      // Randomly select three incorrect answers from the current quiz
      const incorrectAnswers = quiz.answerTexts
        .filter((answer) => answer !== quiz.correctAnswerText) // Exclude the correct answer
        .sort(() => 0.5 - Math.random()) // Shuffle the answers
        .slice(0, 3); // Select the first three incorrect answers

      // Replace one incorrect answer with the correct answer
      const randomIndex = Math.floor(Math.random() * 4);
      incorrectAnswers.splice(randomIndex, 0, quiz.correctAnswerText);

      // Add modified quiz to the array
      modifiedQuizzes.push({
        _id: quiz._id,
        questionText: quiz.questionText,
        answers: incorrectAnswers,
      });
    }

    res.status(200).json({
      success: true,
      data: modifiedQuizzes,
    });
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const checkAnswer = async (req, res) => {
  try {
    const { _id, answer } = req.body;
    const result = await Quiz.findOne({
      _id,
      correctAnswerText: answer,
      delFlag: false,
    });
    if (result) {
      res.status(200).json({
        success: true,
        correct: true,
      });
    } else {
      res.status(200).json({
        success: true,
        correct: false,
      });
    }
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export default {
  create,
  update,
  deleteItem,
  remove,
  list,
  listOne,
  listForQuizType,
  quizForUser,
  checkAnswer,
};
