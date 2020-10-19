const mongoose = require('mongoose');

module.exports = async () => {
  const URI =
    'mongodb+srv://aecuto:aecuto@aecuto-evbpo.mongodb.net/demo-cms-sls';
  const dbOptions = {
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0
  };

  mongoose.connect(URI, dbOptions);
  const db = mongoose.connection;

  db.on('error', error => {
    console.log(`mongodb connection error: ${error.message}`);
  });
};
