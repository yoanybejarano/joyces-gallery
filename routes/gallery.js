module.exports = (router) => {
    /**
     * obtener todos los roles
     */
    router
        .route('/gallery')
        .get((req, res) => {
            res.render('gallery');
        });

}