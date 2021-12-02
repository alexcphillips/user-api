const mongo = require("../mongo");
const { ObjectId } = require("mongodb");
const { newUserSchema } = require("../schemas/user");

const Ajv = require("ajv");
const ajv = new Ajv();

exports.findAll = async (req, res) => {
  const data = await mongo.db.collection("users").find({}).toArray();
  return res.status(200).send(data);
};

exports.insertOne = async (req, res) => {
  try {
    if (!ajv.validate(newUserSchema, req.body)) {
      return res.status(400).send({ error: "Invalid user!" });
    }
    req.body.dateCreated = Date();
    req.body.lastModified = null;
    let insertedId;
    try {
      const result = await mongo.db.collection("users").insertOne(req.body);
      insertedId = result.insertedId;
    } catch (err) {
      if (err.toString().includes("duplicate key error")) {
        return res.status(400).send({ error: "This username is taken" });
      } else {
        throw err;
      }
    }
    return res.status(201).send({ _id: it.insertedId });
  } catch (err) {
    console.log(err.message || err.toString());
    return res.status(500).send();
  }
};
