const mongoose = require('mongoose');

module.exports = async () => {
  const dbOptions = {
    user: process.env.MONGODB_USER || '',
    pass: process.env.MONGODB_PASS || '',
    useNewUrlParser: true,
    authSource: 'admin'
  };

  const DB = process.env.DB_NAME;
  const URI = `${process.env.MONGODB_URI}/${DB}`;

  const mongoUrl = process.env.MONGODB_URL;

  if (mongoUrl) {
    mongoose.connect(mongoUrl);
  } else {
    mongoose.connect(URI, dbOptions);
  }

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connection.on('error', error => {
    console.log(`mongodb connection error: ${error.message}`);
  });
  mongoose.connection.once('open', () => {
    console.log('mongodb has been connected .');
  });
};
