const path = require("path");
const { isDev } = require("../utilities");

let envPath = isDev ? "../../.env.dev" : "../../.env";
require("dotenv").config({ path: path.join(__dirname, envPath) });

const { MongoClient } = require("mongodb");
// null so we can see when it's never set
exports.db = null;

exports.mongoConnect = async (options) => {
  try {
    const defaultOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const client = await MongoClient.connect(
      process.env.MONGO_URI,
      options || defaultOptions
    );

    exports.db = client.db("user-api");
    console.log("Mongo connection SUCCESSFUL");

    return exports.db;
  } catch (err) {
    throw err;
  }
};
