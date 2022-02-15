# Simple node Image processing API 

## Description

This is a simple image API for serving images with various sizes built using Node.js

## How to run 

1. make sure you have installed the latest LTS version of Node, And installed typescript globally.
2. in the root directory (same dir as `package.json`), run `npm install`
3. upon success, you should be able to run tests by running `npm run test`
4. if the tests passed, you can begin running the server by running `npm run start`
5. you should see a message logged to the terminal stating that the server has started and is running on a specified port.
6. once the server is running, you can access the main endpoint at `http://localhost:3000/images/<IMAGE_NAME>` Where image name is an image name under `assets/images` (for example `fjord.jpg`)
7. you can also specify a `width` and/or a `height` for your image as query parameters, for example `http://localhost:3000/images/fjord.jpg?width=200&height=200`

## Scripts
1. `test`: build project and run tests
2. `jasmine`: run tests without building
3. `start`: start server and watch files on changes
4. `build`: build project
5. `prettify`: apply `prettier`, specify a path after command. example: `npm run prettify .\src`
6. `lint`: lint files using `eslint`, specify a path after command. example: `npm run lint .\src`. Also, if you're running this in a linux environment you will need to change the double backslashes in the command with single forward slashes. so it becomes `./node_modules/.bin/eslint`