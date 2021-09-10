# Orinoco instructions

## 1. **Clone the project**

This project is public and free to use, feel free to clone, modify, redistribute.

## 2. **Install dependencies**

`npm install`

## 3. **Generate .env file**

You can copy .env.public to .env

`cp .env.public .env`

The default behaviour is to use heroku hosted API. You can change this behaviour by changing API_URL in you .env file.
You will find the API at this address https://github.com/OpenClassrooms-Student-Center/JWDP5.git

## 4. **Start the project**

### 4.1. **Dev mode**

If you want to modify the project you can start it with `npm run start` it will run in dev mode and constantly update the js bundle.

### 4.2. **Prod mode**

You can bundle the app with `npm run build`
Files necessary to be upload in order to run the project are :

     - index.html
     - product.html
     - card.html
     - confirm.html
     - dist/ folder and all files inside it
