module.exports = {
  async up(db, client) {
    console.log('>>> MIGRATE ROOT USERS TO DB <<<');

    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const slug = require('slug');

    const users = [];
    users.push({
      _id: mongoose.Types.ObjectId(),
      firstName: 'Admin',
      lastName: 'Admin',
      companies: [],
      events: [],
      slug: slug('kyojiro' + ' ' + 'rengoku', '-'),
      userEmail: 'arigato@gmail.com',
      role: 'admin',
      password: await bcrypt.hash('qwerty123', 10),
      timezone: 'Europe/Kiev',
      locale: 'en',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await db.collection('users').insertMany(users);
  },
};
