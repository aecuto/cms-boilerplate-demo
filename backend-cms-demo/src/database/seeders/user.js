const model = require('models/User');
const bcrypt = require('bcryptjs');

// seed data
const seedData = [
  {
    name: 'User',
    email: 'user@20scoops.com',
    password: '123456'
  }
];

// migrate seed data
const seedUp = async () => {
  const saltRound = parseInt(process.env.SALT_ROUNDS);
  try {
    await seedData.map(async data => {
      const salt = await bcrypt.genSalt(saltRound);
      const hashed = await bcrypt.hash(data.password, salt);
      await model.create({
        ...data,
        password: hashed
      });
    });
    console.log('success seed user .');
  } catch (err) {
    console.log(err);
  }
};

// clean seed data
const seedDown = async () => {
  try {
    await model.deleteMany({});
    console.log('success clear all collection .');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  seedUp,
  seedDown
};
