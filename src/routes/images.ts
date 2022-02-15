import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import utils from "../utils";
import { IMAGES_PATH } from "../constants";

const imagesRouter = Router();

imagesRouter.get(
    "/:imageName",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const imagePath = path.join(
                __dirname,
                "..",
                IMAGES_PATH,
                req.params.imageName
            );

            if (fs.existsSync(imagePath)) {
                if (req.query.width || req.query.height) {
                    const thumbPath = await utils.getOrCreateThumb(
                        req.query.width as string,
                        req.query.height as string,
                        req.params.imageName as string
                    );

                    return res.sendFile(thumbPath);
                }
                return res.sendFile(imagePath);
            } else return res.status(404).send("Image not found");
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

export default imagesRouter;
