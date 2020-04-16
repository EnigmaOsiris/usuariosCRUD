const User = require('./../models/user');
const Rol = require('./../models/rol');
module.exports = {
    get: async(req, res) => {
        let users = await User.find({});
        res.render('index', { users: users });
    },
    getAddUser: async(req, res) => {
        let result = {};
        try {
            result.status = 200;
            result.rols = [
                'Administrador',
                'Operador',
                'Administrativo'
            ];

        } catch (error) {
            result.status = 500;
            result.rols = null;
            result.error = error;
        }
        console.log('to view: ', result);
        res.render('create', { result: result });
    },
    postAddUser: async(req, res) => {
        let result = {};
        result.rols = [
            'Administrador',
            'Operador',
            'Administrativo'
        ];
        try {
            let data = req.body;
            console.log('Data in server: ', data);
            const userNick = await User.findOne({ nick: data.nick });
            console.log('after check nik')
            if (userNick) {
                throw `El nick ${data.nick} ya esta en uso!`;
            }
            console.log('to create user')
            const user = new User({
                nick: data.nick,
                nombre: data.name,
                apellidos: data.lastName,
                password: data.password,
                correo: data.email,
                rol: data.rol
            });
            let nUser = await user.save();
            console.log('created user')
            result.status = 201;
            result.user = nUser;
        } catch (error) {
            result.status = 500;
            result.user = null;
            result.error = error;
        }
        res.render('create', { result: result });
    },
    getUpdateUser: async(req, res) => {
        let result = {};
        result.rols = [
            'Administrador',
            'Operador',
            'Administrativo'
        ];
        try {
            const id = req.params.user;
            result.status = 200;
            console.log('Before get user');
            result.user = await User.findById(id);
            console.log('after get user');
        } catch (error) {
            result.status = 500;
            result.error = error;
        }
        res.render('update', { result: result });
    },
    postUpdateUser: async(req, res) => {
        let result = {};
        result.rols = [
            'Administrador',
            'Operador',
            'Administrativo'
        ];
        try {
            const id = req.params.user;
            let data = req.body;
            console.log('DTA: ', data);
            console.log('before cehck nik updae');            
            console.log('after check nik update');
            const user = new User({
                nick: data.nick,
                nombre: data.name,
                apellidos: data.lastName,
                password: data.password,
                correo: data.email,
                rol: data.rol
            });
            console.log('Before update');            
            User.findOneAndUpdate({ _id: id }, {
                    nick: data.nick,
                    nombre: data.name,
                    apellidos: data.lastName,
                    password: data.password,
                    correo: data.email,
                    rol: data.rol
                },
                (err, period) => {
                    if (err) {
                        console.log('Error');
                    }
                    res.redirect('/');
                }
            );
            console.log('afeter update');
            result.status = 201;

        } catch (error) {
            result.status = 500;
            result.user = null;
            result.error = error;
            console.error(error);
            res.render('update', { result: result });
        }

    },
    deleteUser: async(req, res) => {
        try {
            const id = req.params.user;
            await User.deleteOne({ _id: id });
        } catch (error) {

        }
        let users = await User.find({});
        res.render('index', { users: users });
    }
};