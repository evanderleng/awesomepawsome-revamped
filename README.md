# awesome-pawsome

E-Commerce site specialising in delivering tailor-made, hassle free services to dedicated PAWSOME pet owners.

## Backend Setup (Port 4000)
edit .env located in ./backend and change the mongodb URI to your mongodb instance, then run

`cd backend`

`npm run dev`

## Frontend Setup (Port 3000)

`cd frontend`

`npm start`

if setup is done correctly, "connection to backend successful" should be displayed

## Database Population

Read instructions in db.dump to populate your mongodb database


## Frontend: How to add navigation paths
1. Go to App.jsx and add the path first, importantly ensure that you import the page
2. then go to Navbar.jsx or any other component that requires routing and add the <Link/> (remember to import also)

