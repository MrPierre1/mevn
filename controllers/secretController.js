
var secret = require("../models/Secret");


exports.get_all = async (req, res) => {
    console.log("finding secrets");
    const secrets = await secret.find();
    res.json(secrets);
  }