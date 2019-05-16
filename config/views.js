const exphbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const routes = require('../routes/');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

module.exports = (app) => {

    routes(app);

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    //Register Handlebars as default view rendering engine
    app.engine('.hbs', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: require('../helpers/handlebars').helpers,
        extname: '.hbs'
    }).engine);
    app.set('view engine', '.hbs');

    let viewsPath = path.join(__dirname, '../views/');
    app.set('views', viewsPath);

    let staticFilesPath = path.join(__dirname, '../views/assets/');
    console.log('static files : ' + staticFilesPath);
    app.use(express.static(staticFilesPath));
    app.use(morgan('short'));

    return app;

};