const mongo = require("../mongo");
const { validateUserCreation } = require("../../utils/userCreation");

exports.findAll = async (req, res) => {
  const data = await mongo.db.collection("users").find({}).toArray();
  for (const user of data) {
    console.log(user.name);
  }
  return res.status(200).send(data);
};

exports.insertOne = async (req, res) => {
  const { name, username, email } = req.body;
  const userInfo = [name, username, email];
  if (userInfo.every(validateUserCreation)) {
    console.log("hi");
    res.send({ hi: "yes" });
  } else {
    res.send({ hi: "no" });
  }
};

// add id, dateCreated, dateModified, leave out billing info until they want to make a purchase
