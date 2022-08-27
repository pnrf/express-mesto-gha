require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// const routesUsers = require('./routes/users');
// const routesCards = require('./routes/cards');
// const NotFoundError = require('./errors/not-found-error');
// const { createUser, login } = require('./controllers/users');
// const auth = require('./middlewares/auth');
// const { validateSignUp, validateSignIn } = require('./middlewares/validators');
const allRouters = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', allRouters);
// app.post('/signup', validateSignUp, createUser);
// app.post('/signin', validateSignIn, login);

// app.use(auth);
// app.use('/users', routesUsers);
// app.use('/cards', routesCards);

// app.use(() => {
//   throw new NotFoundError('Запрашиваемый ресурс не найден');
// });

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
