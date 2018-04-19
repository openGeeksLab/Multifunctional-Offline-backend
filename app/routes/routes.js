import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../schems/UserSchems';

const routes = Router();
routes.get('/', (req, res) => {
  res.send({ index: 2 });
});


// USER ENDPOINTS
routes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
}); 


routes.post('/setup', (req, res) => {
  // create a sample user
  console.warn('req', req.body);
  const nick = new User({ 
    username: req.body.username, 
    password: req.body.password,
  });
  // save the sample user
  nick.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});


routes.post('/authenticate', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        res.json({
          token: jwt.sign({ username: user.username, password: user.password }, 'keyboard cat') });
      }
    }
  });
});

export default routes;
