import {Skin} from '../models/index.js'
import {skin} from "../config/constants.js"

export default async () => {
  try {
    const result = await Skin.find();
    if(result.length === 0) {
      const insertedSkins = Skin.insertMany(skin);
      console.log(insertedSkins)

    } else {

    }
    console.log("OK")
    // res.status(201).json(insertedSkins);
  } catch (err) {
    console.log("Error :", err.message)
    // res.status(500).json({ error: 'Error inserting skins' });
  }
}