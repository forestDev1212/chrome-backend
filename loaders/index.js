import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import initDatabase from "./initDatabase.js"

export default async (app) => {
  await mongooseLoader();
  expressLoader(app);
  initDatabase()
}