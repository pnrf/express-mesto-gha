const express = require('express');
const mongoose = require('mongoose');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const httpStatusCodes = require('./utils/httpStatusCodes');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e2adceadd1eaee0a4d30c1',
  };

  next();
});

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/cards', require('./routes/cards'));

app.use(routesUsers);
app.use(routesCards);

app.use((req, res) => {
  res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
