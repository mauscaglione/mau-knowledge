const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
//somente as rotas acima serão públicas, sem necessidade de validação para acesso
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.softRemove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.categories.get))
        .post(admin(app.api.categories.save))
    //Cuidado com a ordem! Tem que vir antes das rotas generalistas
    //como a '/categories/:id'
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getTree)
    
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getById)
        .put(admin(app.api.categories.save))
        .delete(admin(app.api.categories.remove))
    
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.articles.get))
        .post(admin(app.api.articles.save))
    
    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getById)
        .put(admin(app.api.articles.save))
        .delete(admin(app.api.articles.remove))
        
    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}