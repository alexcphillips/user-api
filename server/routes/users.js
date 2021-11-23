const mongo = require("../mongo");
const { validateUserCreation } = require("../../utils/userCreation");

exports.findAll = async (req, res) => {
  const data = await mongo.db.collection("users").find({}).toArray();
  for (const user of data) {
    console.log(user.name);
  }
  return res.status(200).send(data);
};
