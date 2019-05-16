
module.exports = (router) => {
    /**
     * obtener todos los roles
     */
    router
        .route('/')
        .get((req, res) => {
            res.render('index');
        });

}