import express, {Express} from "express"
import loaders from "./loaders"

const app:Express = express();

const startApp = async () => {
  await loaders(app);
  app.listen(3000, () => {
    console.log("server start");
  });
};

export default startApp;