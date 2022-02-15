import fs from "fs";
import path from "path";
import sharp from "sharp";
import { IMAGES_PATH, THUMBS_PATH } from "../constants";

const getOrCreateThumb = async (
    widthParam: string,
    heightParam: string,
    imageName: string
): Promise<string> => {
    const width = widthParam ? parseInt(widthParam as string) : null;
    const height = heightParam ? parseInt(heightParam as string) : null;
    const imagePath = path.join(__dirname, "..", IMAGES_PATH, imageName);
    const thumbDirPath = path.join(__dirname, "..", THUMBS_PATH);
    if (!fs.existsSync(thumbDirPath)) fs.mkdirSync(thumbDirPath);
    const [imageBaseName, imageExtension] = imageName.split(".");
    const thumbPath = path.join(
        thumbDirPath,
        `${imageBaseName}_W${width}_H${height}.${imageExtension}`
    );
    if (fs.existsSync(thumbPath)) return thumbPath;
    const image = await sharp(imagePath).resize(width, height).toBuffer();

    fs.writeFileSync(thumbPath, image);

    return thumbPath;
};

export { getOrCreateThumb };
