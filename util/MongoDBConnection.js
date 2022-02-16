async function connectToDB() {
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  return client.db("chem-db");
}

export const db = connectToDB();
