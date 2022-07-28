const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e2adceadd1eaee0a4d30c1',
  };

  next();
});

app.use(routesUsers);
app.use(routesCards);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
