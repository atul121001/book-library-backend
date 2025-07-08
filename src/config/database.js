const mongoose = require('mongoose');

const url = "mongodb+srv://atulmishrafbd:axubKgIb6DTPLdBh@node-project.2j8pkxg.mongodb.net/NodeProject1";

const connectDB = async () => {
    await mongoose.connect(url);
}

module.exports = {connectDB}; 