import morgan from 'morgan'
import express, { Express } from 'express'
import configs from "../configs"
import router from "../routers"

const appLoader = (app: Express) => {
if (process.env.NODE_ENV !== "test") {
        app.use(morgan("dev"));
    }
    app.set("port", configs.APP.PORT)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("", router);
}

export default appLoader