function routes(app){
    app.use('/user', require('./routes/user.js'));
    //app.use('/task', require('./routes/task.js'));
    return;
}

module.exports = routes;