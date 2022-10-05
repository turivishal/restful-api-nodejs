# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

Customized structure for RESTful API in NodeJS.

### How do I get set up? ###

- #### Pre Required:

1) Download & Install latest NodeJS: https://nodejs.org/en/download/

2) Download & Setup latest MongoDB server: https://www.mongodb.com/try/download/community
    - Download & Install [MongoDB Compass](https://www.mongodb.com/try/download/compass) or any MongoDB IDE.

- #### Setup:

1) Clone repository 
```cmd
git clone https://github.com/turivishal/restful-api-nodejs.git
```
2) Navigate to clone project directory
3) Install dependencies
```cmd
npm install
```
4) Configure
    
    i) Port (optional)
    
    - The default port is **3000**, you can change if you want to, navigate to project directory > `app/config/development.yml`, in this file there is a property called `server` > `port`.
    
    ii) Database connection (optional)
    
    - The default connection link is **"mongodb://localhost:27017/ProductLocal"**, you can change it as per your choice, navigate to project directory > `app/config/development.yml`, in this file there is a property called `mongodb` > `uris`.

5) Create a `.env` file in the root directory of the project, and declare 2 variables for environment config file selection
```
PROFILE=development
NODE_ENV=development
```
6) Run project
```cmd
npm start
```
7) You will see the console message
```
> restful-api-nodejs@1.0.0 start
> node app.js

info: We are working on DEVELOPMENT environment and Listening on port 3000... {"timestamp":"2022-10-05 16:57:19:551"}
info: MongoDB connection succeeded! {"timestamp":"2022-10-05 16:57:19:574"}
```
8) Open the link http://localhost:3000/api-docs in browser and it will open the swagger

![image](https://user-images.githubusercontent.com/10988772/130230131-54ffe879-0820-42f5-bde8-983ac697bfe2.png)


### Who do I talk to? ###

* turivishal@gmail.com
