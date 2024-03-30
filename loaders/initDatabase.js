import { Skin } from "../models/index.js";
import { skin, quizTypes } from "../config/constants.js";
import QuizType from "../models/quiz_type.js";

export default async () => {
  try {
    const skinResult = await Skin.find();
    if (skinResult.length === 0) {
      const insertedSkins = await Skin.insertMany(skin);
      console.log(insertedSkins);
    } else {
    }
    const quizTypeResult = await QuizType.find();
    if (quizTypeResult.length === 0) {
      const insertedQuizTypes = await QuizType.insertMany(quizTypes);
      console.log(insertedQuizTypes);
    }
    console.log("OK");
    // res.status(201).json(insertedSkins);
  } catch (err) {
    console.log("Error :", err.message);
    // res.status(500).json({ error: 'Error inserting skins' });
  }
};
