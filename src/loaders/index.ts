import {Express} from 'express'
import appLoader from "./appLoader";
// const dbLoader = require("./dbLoader");

const loaders = async (app:Express) => {
//   await dbLoader();
  appLoader(app);
};

export default loaders