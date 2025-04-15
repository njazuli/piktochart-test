## Instructions

In this test we want you to create a super-duper mini Piktochart editor for us! Let's get started!

## Features

Here are the things we expect to work as a result of your efforts!

- User must see the existing images from folder `images` to the images list
- User can *upload image* to folder `images` and the list must update accordingly
- User can *add image / text* from the sidebar to the canvas
- User can *move and delete the image / text* inside the canvas
- The created objects on canvas can be saved and repopulated even if we refresh the browser!

Well you always have Editor on create.piktochart.com to look at to see how things should work, eh?

## Resources

We've prepared the overall structure of the project for you to get you started. We've also added an Express server to let you upload and retrieve Images. Instructions on how to run and use the server are down below!

## Requirements

Well, we expect a couple of things that help us in our assessment of you!

- The App should have the features listed [above](#features)

- It should work on modern browsers (Chrome / Firefox) (ew, who uses IE?!)

- We expect the Logic and data flows to be written in a functional and reactive programming concept

    Separate the logic between application data state and template view / user interactions (unidirectional data flow). 

- Use as little libraries as possible,

    If you need to use third-party libraries, we recommend Vue (that's what we use).
    Other than that, feel free to use other libraries that you think will help you.
    For moving item inside the canvas, try your best to do it without using a third-party library.

    _Note: use native HTML element `<div>`, not `<canvas>`_

- We love Spaghetti, but not in our code!

    Help us understand your flow easier by code comments or clean coding practices.

- Build automated test for the app

- Let your imagination run! Get creative and surprise us!


## How to Submit

- Get rid of `node_modules`

- Zip your working folder with the name `<your name>-piktofetest`

- If you're using Github or a Sandbox, you can pass us the link

- You have **three day** to complete the test. If you are not able to finish, do send us whatever you have done, we will evaluate accordingly. If you need more time to fulfill all the features and requirements, let us know, we could give you more time!

Have fun hacking!

## How To Install

To set up the environment dependencies

```
$ npm install
```

To run the node server

```
$ npm run start
```

Server is listening to port `8000`

### API

#### GET uploaded images

```
GET /images
```

#### POST image to server

```
POST /uploads
```

### Note

- The name of the file input has to be `upload` as the server will look for it in the `multipart` payload
- The server only accepts `png` and `jpeg` file format
- You are allowed to edit the server.js file if you please :)

