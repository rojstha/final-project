const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// ✅ Register models to make sure they sync
const { User, Task } = require('./models');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Setup Handlebars with helpers
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ✅ Session setup
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
app.use(session(sess));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use(routes);

// ✅ Sync Sequelize models and start server
sequelize.sync({ force: false }).then(() => {
  console.log('🔁 Sequelize synced');
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
});
