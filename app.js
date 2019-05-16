require('./config/env');

/** require dependencies */
const express = require("express");
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');

let app = express();
const router = express.Router();

/** set up routes {API Endpoints} */
routes(router);

app.use(bodyParser.json());
app.use(helmet());

let configView = require('./config/views');
app = configView(app);

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});