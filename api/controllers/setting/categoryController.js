import { message } from 'antd';
import {Category} from "../../../models/index.js"

const create = async (req, res) => {
  try {
    const data = req.body
    const newDoc = new Category({
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
    const result = await Category.find({
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
      message : err.message
    })
  }
}

const listOne = async (req, res) => {
  try {
    const {id} = req.query
    const result = await Category.findOne({
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

const update = async (req, res) => {
  try {
    const data = req.body;
    const {id} = data
    const updateResult = await Category.findByIdAndUpdate(id, data);
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
    const removedResult = await Category.updateOne(id, {
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

const deleteOne = async (req, res) => {
  try {
    const {id} = req.query
    const deletedResult = await Category.deleteOne(id)
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

export default {
  create,
  update,
  list,
  listOne,
  remove,
  deleteOne
}