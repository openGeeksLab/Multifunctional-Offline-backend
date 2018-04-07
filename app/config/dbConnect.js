const mongoose = require('mongoose');

mongoose.connect('mongodb://ivan:123123@ds237489.mlab.com:37489/offlineapp')
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err, 'db problem'));
