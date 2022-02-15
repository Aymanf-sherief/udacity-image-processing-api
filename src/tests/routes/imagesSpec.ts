import fs from "fs";
import path from "path";
import { IMAGES_PATH, THUMBS_PATH } from "../../constants";
import supertest from "supertest";
import app from "../../index";

const request = supertest(app);
const imageName = "fjord.jpg";

describe("Test images router", () => {
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

    it("should be able to get existing image with original size", async () => {
        const response = await request.get(`/images/${imageName}`);
        const imagePath = path.join(
            __dirname,
            "..",
            "..",
            IMAGES_PATH,
            imageName
        );

        const imageBuffer = fs.readFileSync(imagePath);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(imageBuffer);
    });
    it("should be able to get resized existing image", async () => {
        const response = await request.get(
            `/images/${imageName}?width=200&height=200`
        );
        const [imageBaseName, imageExtension] = imageName.split(".");
        const imagePath = path.join(
            __dirname,
            "..",
            "..",
            THUMBS_PATH,
            `${imageBaseName}_W${200}_H${200}.${imageExtension}`
        );

        const imageBuffer = fs.readFileSync(imagePath);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(imageBuffer);
    });
    it("should throw 404 error when attempting to get non-existing image", async () => {
        const response = await request.get(
            `/images/mockWrongImageName?width=200&height=200`
        );

        expect(response.status).toBe(404);
        expect(response.text).toEqual("Image not found");
    });
});
