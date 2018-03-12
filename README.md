# Nodejs Sample Application

## Introduction:
This is a sample app for a recruitment process for Caremerge. This test consists of three parts. I need to implement the same task three times using different control flow strategies which shows my understanding of control flow in an asynchronous environment.  All tasks are implemented using Nodejs with express server, <a href="https://pugjs.org/api/getting-started.html">Pug</a> is used for templating, *cheerio*, *normalizeUrl* and *request* are some of the other packages used. *cheerio* is used for parsing html and extracting title. *normalizeUrl* is used for cleaned and valid urls. *sass* for styling and *gulp* task runner for generating the css from sass. For now its the only task in gulp as we dont have images, scripts or other front-end assets.

## Instructions :
This is a nodejs Application as a test submission for recruitment process. You need to have node and npm installed. Clone the repository or download it as zipped folder. To install dependencies browse to the root location of the project in the terminal/command line and run the following command:
```
npm install
```
This will install all dependency packages required. I have used *nodemon* for running server but node will work fine The app or server can be run with following commands:
```
    node server.js
```    
This command will run the express server on port 3000. Open a browser and go to following url:
```
http://localhost:3000/I/want/title?type=1&address=google.com
```
The optional *type* param in the url is used to provide intuitive interface for user. The type is optional and can have one of the following values:
```
type=1 : The webapp will use the raw callbacks method to perform the desired operations
type=2 : The webapp will use the async method to perform the desired operations
type=3 : The webapp will use the promise  to perform the desired operations
```
