import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String, required: true, select: false
  },
  name: {
    type: String, required: true
  },
  //NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
  deletedAt: {
    type: Date
  }
},
  {
    timestamps: true
  });

const User = model('User', userSchema)
export default User

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         email:
*           type: string
*         name:
*           type: string
*         username:
*           type: string
*         type:
*           type: string
*           enum: ['user', 'admin', 'creator', 'reader']
*         language:
*           type: string
*           enum: ['tr', 'en']
*         isPremium:
*           type: boolean
*         gender:
*           type: string
*           enum: ['male', 'female', 'other']
*         countryCode:
*           type: string
*         timezone:
*           type: number
*         birthDate:
*           type: string
*         photoUrl:
*           type: string
*         isActivated:
*           type: boolean
*         isVerified:
*           type: boolean
*         deviceId:
*           type: string
*         platform:
*           type: string
*           enum: ['Android', 'IOS']
*         deletedAt:
*           type: string
*/