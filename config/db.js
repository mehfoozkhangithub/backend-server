
    const mongoose = require("mongoose");

    require("dotenv").config();

    const connect = mongoose.connect(process.env.url);

    module.exports = {connect};

    