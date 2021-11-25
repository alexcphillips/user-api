const mongo = require("../mongo");
const { newUserSchema } = require("../schemas/user");

const Ajv = require("ajv");
const ajv = new Ajv();

exports.findAll = async (req, res) => {
  const data = await mongo.db.collection("users").find({}).toArray();
  for (const user of data) {
    console.log(user.name);
  }
  return res.status(200).send(data);
};

exports.insertOne = async (req, res) => {
  try {
    if (
      await mongo.db
        .collection("users")
        .findOne({ username: req.body.username })
    ) {
      return res.status(400).send({ error: "That username is taken." });
    }
    if (!ajv.validate(newUserSchema, req.body)) {
      return res.status(400).send({ error: "Invalid user!" });
    }
    req.body.dateCreated = Date();
    req.body.lastModified = null;
    await mongo.db.collection("users").insertOne(req.body);
    res.status(201).send();
  } catch (err) {
    console.log(err.message || err.toString());
    res.status(500).send();
  }
};
