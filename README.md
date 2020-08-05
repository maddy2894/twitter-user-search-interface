
# Twitter user search interface

## Instructions

### 1) Before installation
* Create an app in [Twitter's developer account](https://developer.twitter.com/en/apps).
* Navigate to Apps details -> Keys and Tokens
* Click on generate to get Access token and access token secret.
* Copy and store it safely along with API and API Secret key.
  
### 2) Installation steps
* Download or clone this repository.
* Open the terminal/command prompt on the root folder.
* Create a `.env` file under server folder next to `.env.example`.
* Copy the contents from `.env.example` to `.env`.
* Use the tokens and secret keys obtained from step 1 to fill the fields in `.env` file.
  
## There are two ways to run this code. 
  
### A) Method 1 - Running on server only.
* From your root folder, run the following commands in the terminal/command prompt.
1. `npm run client-server:install` - To install 3rd party libraries.
2. `npm run client-server:build` - To compile both client and server's TypeScript code to JavaScript code.
3. `npm run server:start` - To start the server
4. Go to your browser and visit http://localhost:4000

### B) Method 2 - Running on client and server.
* From your root folder, run the following commands in the terminal/command prompt (You can skip steps 1 - 2 if you have followed the above method).
1. `npm run client-server:install` - To install 3rd party libraries.
2. `npm run client-server:build` - To compile both client and server's TypeScript code to JavaScript code.
3. `npm run client-server:start` - To start both client and server concurrently.
4. It should automatically take you to the browser. If not, visit http://localhost:3000 in your browser.

### Test
* From your root folder, run the following commands in the terminal/command prompt.
1. `npm run server:start` - To start the server.
2. open another tab in the terminal/command prompt
3. `npm run test` - To run the test.

### Future

#### Adding CI/CD to the project:
We can use AWS CodePipeline to source this repository and automatically start build and deploy prcocess when a commit is been made to the master branch.
* Optimal configuration of AWS CodePipeline:
1. Source - This GitHub repository.
2. Build - AWS CodeBuild.
3. Deploy - AWS Elastic BeanStalk.

