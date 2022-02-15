import express from "express";
import expeditious from "express-expeditious";
import { imagesRouter } from "./routes";

const cacheoptions: expeditious.ExpeditiousOptions = {
    namespace: "expresscache",
    defaultTtl: "1 hour",
};

const cache = expeditious(cacheoptions);

imagesRouter.use(cache.withTtl("1 hour"));

const app = express();

app.use("/images", imagesRouter);

app.listen(3000, () => console.log("Server started on port 3000"));

export default app;
