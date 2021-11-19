const { app } = require("./app");
const { mongoConnect } = require("./mongo");

(async () => {
  await mongoConnect();

  app.listen(process.env.PORT, () => {
    console.log("Server started SUCCESSFULLY");
  });
})();
