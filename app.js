const Express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const routes = require('./routes');
const genericFn = require('./database-adapter/generic/crudOps');
const config = require('./config/config');
const dbURI = config.get('mongourl');
const script = require('./scripts')
const app = new Express();
script.startCron()
genericFn.connect(dbURI).then(
  () => {
    console.log("Database connected to",dbURI);
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;