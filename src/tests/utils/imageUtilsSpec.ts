import fs from "fs";
import path from "path";
import imageUtils from "../../utils";
import { IMAGES_PATH, THUMBS_PATH } from "../../constants";

const imageName = "fjord.jpg";
describe("Test image utilities", () => {
    beforeAll(() => {
        const imagesDirPath = path.join(__dirname, "..", "..", IMAGES_PATH);

        if (!fs.existsSync(imagesDirPath)) {
            throw new Error("Images directory not found");
        }
    });

    afterEach(() => {
        const thumbDirPath = path.join(__dirname, "..", "..", THUMBS_PATH);
        fs.rmSync(thumbDirPath, { recursive: true, force: true });
    });

    it("should be able to create new thumb given width and height", async () => {
        const thumbPath = await imageUtils.getOrCreateThumb(
            "200",
            "200",
            imageName
        );
        const [imageBaseName, imageExtension] = imageName.split(".");
        const thumbDirPath = path.join(__dirname, "..", "..", THUMBS_PATH);
        const expectedThumbPath = path.join(
            thumbDirPath,
            `${imageBaseName}_W${200}_H${200}.${imageExtension}`
        );
        expect(thumbPath).toEqual(expectedThumbPath);
    });
    it("should be able to create new thumb given height only", async () => {
        const thumbPath = await imageUtils.getOrCreateThumb(
            "",
            "200",
            imageName
        );
        const [imageBaseName, imageExtension] = imageName.split(".");
        const thumbDirPath = path.join(__dirname, "..", "..", THUMBS_PATH);
        const expectedThumbPath = path.join(
            thumbDirPath,
            `${imageBaseName}_W${null}_H${200}.${imageExtension}`
        );
        expect(thumbPath).toEqual(expectedThumbPath);
    });
    it("should be able to create new thumb given width only", async () => {
        const thumbPath = await imageUtils.getOrCreateThumb(
            "200",
            "",
            imageName
        );
        const [imageBaseName, imageExtension] = imageName.split(".");
        const thumbDirPath = path.join(__dirname, "..", "..", THUMBS_PATH);
        const expectedThumbPath = path.join(
            thumbDirPath,
            `${imageBaseName}_W${200}_H${null}.${imageExtension}`
        );
        expect(thumbPath).toEqual(expectedThumbPath);
    });
});
