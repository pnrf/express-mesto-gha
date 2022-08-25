const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
// const httpStatusCodes = require('./utils/httpStatusCodes');
const NotFoundError = require('./errors/not-found-error');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/cards', require('./routes/cards'));

app.use(routesUsers);
app.use(routesCards);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
  // res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

// обработчик ошибок валидации - Joi, celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка по умолчанию.' : message,
  });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
