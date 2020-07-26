import morgan from 'morgan'
import express, {Express} from 'express'

const appLoader = (app: Express) => {
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use("", router);
}

export default appLoader