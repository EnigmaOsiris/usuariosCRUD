const crud = require('./../controllers/user');
module.exports = (app) => {
    app.get('/', crud.get);
    app.get('/create', crud.getAddUser);
    app.post('/create', crud.postAddUser);
    app.get('/update/:user', crud.getUpdateUser);
    app.post('/update/:user', crud.postUpdateUser);
    app.delete('/update/:user', crud.postUpdateUser);
}