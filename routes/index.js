const home = require('./home');
const gallery = require('./gallery')

module.exports = (router) => {

    home(router);
    gallery(router);

};