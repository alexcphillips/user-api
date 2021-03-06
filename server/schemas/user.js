exports.newUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    username: { type: "string" },
    email: { type: "string" }
  },
  required: ["name", "username", "email"],
  additionalProperties: false
};
