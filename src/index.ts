import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const app = express();

app.get("/images/:imageName", async (req, res) => {
    const imagePath = path.join(
        __dirname,
        "..",
        "assets",
        "images",
        req.params.imageName
    );

    try {
        if (fs.existsSync(imagePath)) {
            if (req.query.width || req.query.height) {
                const { width: widthParam, height: heightParam } = req.query;
                const width = widthParam
                    ? parseInt(widthParam as string)
                    : null;
                const height = heightParam
                    ? parseInt(heightParam as string)
                    : null;
                console.log("got", { width, height });
                const image = await sharp(imagePath)
                    .resize(width, height)
                    .toBuffer();
                const thumbFolderPath = path.join(
                    __dirname,
                    "..",
                    "assets",
                    "thumbs"
                );
                if (!fs.existsSync(thumbFolderPath))
                    fs.mkdirSync(thumbFolderPath);
                const thumbPath = path.join(
                    thumbFolderPath,
                    req.params.imageName
                );
                fs.writeFileSync(thumbPath, image);
                res.sendFile(thumbPath);
            }
            res.sendFile(imagePath);
        } else res.status(404).send("Image not found");
    } catch (err: any) {
        res.send("An error occurred: " + err.message);
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));
