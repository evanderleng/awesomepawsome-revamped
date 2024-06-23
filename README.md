# Awesome-pawsome
E-Commerce site specialising in delivering tailor-made, hassle free services to dedicated PAWSOME pet owners.
# General Installation
```
cd backend OR cd frontend
npm start
```
- Will run as long as the npm process is running
    - Frontend runs on port 5173 by default
    - Server runs on port 4000 by default
- Runs `npm install` before actual commands used for start
    - Located in the `package.json` files
# Frontend Instructions
1. When running locally, if want to run on port 80 persistently, change nginx config to  
    ```
    server {
        listen 80;

        root <path to frontend> # Ensure this dir exists and has all required files inside
        index index.htm index.html

        location / {
            try_files $uri $uri/ =404;
        }
    }
    ```
1. Main pages are in `/frontend/src/pages`
1. Build files will always be in /`frontend/dist`
# Backend Instructions
## Docker for MongoDB
### Installation
1. Install Docker  
    `docker pull mongodb/mongodb-community-server:latest`

1. Run mongodb as container  
    `docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest`

1. Connect to MongoDB Instance (Assuming db is running locally)  
    `mongosh --port 27017`       

1. Create and use new database  
    `use awesomepawsome`

1. Create collections  
    `db.createCollection("users")`  
    `db.createCollection("products")`  
    `db.createCollection("orders")`  
    `db.createCollection("reviews")`  
    `db.createCollection("cart")`  

1. Import data from /database/db folder if need be, use following in new terminal  
    `mongoimport --uri mongodb://<database ip>:27017/awesomepawsome --collection <collection name> --file <file path> --jsonArray`

### Reconnecting
1. If container has stopped  
    `docker start mongodb` 

1. If ever need to restart container  
    `docker restart mongodb`  

1. Running mongosh to connect to db  
    - if running on same computer
        `mongosh awesomepawsome --port 27017` OR  
    - Generic conenct command
    `mongosh "mongodb://<user>@<ip>:<port>/<database>"`
        - default port is 27017

## Interacting with Backend data
1. Useful locations and information
    - DB connection info is in `/backend/.env`
        - Change this to connect to your own db when running locally
    - DB schemas are in `/backend/models`
    - API functions are in `/backend/controllers`
    - API routes are in `/backend/routes`
    - Full overview - `contracts.txt`

1. Ensure backend server is up and running
    - Runs on port 4000 by default, can be changed later on in `/backend/app.js`
    ```
    cd backend
    npm run dev
    ```

1. Use Postman to send HTTP requests to `<url>:<port>/<api route>` to test with backend
    - *\<url>:\<port>* is where the backend server is currently running on
    - *\<api route>* is where you want to test on, as seen in `contracts.txt`
    - Currently it takes in JSON as data type, within the body, so remember to set as that