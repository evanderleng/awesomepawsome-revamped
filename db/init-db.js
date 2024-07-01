const DATA_FILE_PREFIX = "awesome-pawsome";
const conn = new Mongo();
const db = conn.getDB("awesomepawsome");

const collections = ["users", "products", "carts", "reviews", "orders"];

collections.forEach((collection) => {
  const fileContent = cat(`${DATA_FILE_PREFIX}.${collection}.json`);
  const data = JSON.parse(fileContent);

  db[collection].insertMany(data);
});
