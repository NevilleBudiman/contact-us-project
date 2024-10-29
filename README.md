## Contact Us
The "Contact Us" page serves as a crucial interface for users to reach out with inquiries, feedback, or support requests. This page typically includes a user-friendly form where visitors can input their name, email, subject, and message.

## Requirements
*  Frontend
    *  Node.js and NPM
          ```
          sudo apt update
          sudo apt install curl
          curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
          sudo apt install -y nodejs
          ```
*  Backend
    *  Node.js and NPM
          ```
          sudo apt update
          sudo apt install curl
          curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
          sudo apt install -y nodejs
          ```
    *  PostgreSQL
          ```
          sudo apt update
          sudo apt install postgresql postgresql-contrib
          ```
*  Container
    *  Docker
          ```
          sudo apt update
          sudo apt install apt-transport-https ca-certificates curl software-properties-common
          curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
          sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
          sudo apt update
          sudo apt install docker-ce
          ```

## Installation (Without Docker)
* Frontend
    ```
    cd frontend
    npm install
    //adjust .env file
    npm start
    ```
*  Backend
    ```
    cd backend
    npm install
    npx sequelize-cli db:migrate
    //adjust .env file
    //adjust /config/config.json file
    npm start
    ```

## Installation (With Docker)
*  Frontend & Backend
    ```
    docker-compose up --build
    ```

## Testing (Jest and Supertest)
*  Backend
    ```
    cd backend
    npm test
    ```

## Security
* Frontend
    *  Email validation
    *  reCAPTCHA
*  Backend
    *  Email validation on route and model
    *  Verify reCAPTCHA middleware
    *  Rate limit middleware

## Library
*  Frontend
    *  React
    *  Redux
    *  React Router Dom
    *  MUI
    *  Immer
    *  React Hook Form
    *  React Google Recaptcha
*  Backend
    *  Express
    *  Dotenv
    *  Cors
    *  Pg
    *  Pg-hstore
    *  Sequelize
    *  Jest
    *  Supertest
    *  Axios
    *  Express rate limit
    *  Express validator
