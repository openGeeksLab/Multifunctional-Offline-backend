import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import db from './config/dbConnect';

const app = express();
// const db = require('./config/dbConnect');


// View engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handler
app.use((err, req, res) => {
  res.status(err.status || 500);

  if (err.status === 400) {
    res.json({
      error: err.message,
    });
  } else {
    res.json({ error: { message: err.message } });
  }
});

app.listen(3000, () => {
   console.log('Example app listening on port 3000!');
});
