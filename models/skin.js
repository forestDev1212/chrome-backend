import mongoose from "mongoose";
const { Schema, model } = mongoose;

const skinSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    demoImageSrc: {
      type: String,
      required: true,
    },
    applied: {
      type: Boolean,
      required: true,
      default: false,
    },
    //NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
    categories: {
      type: Array,
      required: true,
    },
    quizTypes: {
      type: Array,
      required: true,
    },
    appliedQuizTypes: {
      type: Array,
    },
    allowedQuizTypes: {
      type: Array,
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

const Skin = model("Skin", skinSchema);
export default Skin;

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
