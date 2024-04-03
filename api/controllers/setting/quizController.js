import {Quiz} from "../../../models/index.js"

const create = async (req, res) => {
  try {
    const data = req.body
    const newDoc = new Quiz({
      ...data
    })
    await newDoc.save();
    return res.json({
      success : true,
      message : "Successfully Created!"
    })
  } catch (err) {
    console.log("Error : ", err.message)
    res.json({
      success : false,
      message : err.message
    })
  }
}

const list = async (req, res) => {
  try {
    const result = await Quiz.find({
      delFlag : false
    })
    res.status(200).json({
      success : true,
      data : result
    })
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success : false,
      message : err.message,
    })
  }
}

const listOne = async (req, res) => {
  try {
    const {id} = req.query
    const result = await Quiz.findOne({
      delFlag : false,
      _id : id
    })
    res.status(200).json({
      success : true,
      data : result
    })
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success : false,
      message : err.message
    })
  }
}

const listForQuizType = async (req, res) => {
  try {
    const {level, category, quizType} = req.query
    const result = await Quiz.find({
      delFlag : false,
      level,
      category,
      quizType,
    })
    res.status(200).json({
      success : true,
      data : result
    })
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success : false,
      message : err.message
    })
  }
}

const update = async (req, res) => {
  try {
    const data = req.body;
    const {_id : id} = data
    const updateResult = await Quiz.findByIdAndUpdate(id, data);
    if(!updateResult) {
      return res.status(404).json({
        success : false,
        message : "No Result with id: " + id
      })
    } else {
      res.status(200).json({
        success : true,
        message : "Successfully Updated!"
      })
    }
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success : false,
      message : err.message
    })
  }
}

const remove = async (req, res) => {
  try {
    const {id} = req.query
    const removedResult = await Quiz.findByIdAndUpdate(id, {
      delFlag : true
    })
    if(!removedResult) {
      return res.json({
        success : false,
        message : "No Result with id: " + id
      })
    } else {
      res.status(200).json({
        success : true,
        message : "Successfully removed."
      })
    }
  } catch (err) {
    console.log("Error : ", err.message)
    res.json({
      success : false,
      message : err.message
    })
  }
}

const deleteItem = async (req, res) => {
  try {
    const {id} = req.query
    const deletedResult = await Quiz.deleteOne(id)
    if(!deletedResult) {
      return res.json({
        success : false,
        message : "No Result with id: " + id
      })
    } else {
      res.status(200).json({
        success : true,
        message : "Successfully deleted."
      })
    }
  } catch (err) {
    console.log("Error : ", err.message)
    res.json({
      success : false,
      message : err.message
    })
  }
}

const quizForUser = async (req, res) => {
  try {
    const {level, category, quizType} = req.query
    const result =  await Quiz.aggregate([
      { $match: { quizType, level, category } }, // Match documents that meet the specified criteria
      { $sample: { size: 3 } } // Sample 10 random documents from the matched documents
    ]);
    res.status(200).json({
      success : true,
      data : result
    })
  } catch (err) {
    console.log("Error :", err.message);
    res.json({
      success : false,
      message : err.message,
    })
  }
}

export default {
  create,
  update,
  deleteItem,
  remove,
  list,
  listOne,
  listForQuizType,
  quizForUser,
} 