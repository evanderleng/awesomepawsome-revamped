mongoimport --uri mongodb://localhost:27017/awesomepawsome --collection users --file /data/awesomepawsome.users.json --jsonArray
mongoimport --uri mongodb://localhost:27017/awesomepawsome --collection products --file /data/awesomepawsome.products.json --jsonArray
mongoimport --uri mongodb://localhost:27017/awesomepawsome --collection reviews --file /data/awesomepawsome.reviews.json --jsonArray
mongoimport --uri mongodb://localhost:27017/awesomepawsome --collection carts --file /data/awesomepawsome.carts.json --jsonArray
mongoimport --uri mongodb://localhost:27017/awesomepawsome --collection orders --file /data/awesomepawsome.orders.json --jsonArray
