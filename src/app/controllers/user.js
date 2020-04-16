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

        try {
            let data = req.body;
            console.log('Data in server: ', data);
            const userNick = await User.findOne({ nick: data.nick });

            if (user) {
                throw `El nick ${data.nick} ya esta en uso!`;
            }

            const user = new User({
                nick: data.nick,
                nombre: data.name,
                apellidos: data.lastName,
                password: data.password,
                correo: data.correo,
            });
            let nUser = await user.save();
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
        try {
            const id = req.params.user;
            result.status = 200;
            result.user = await User.find({ _id: id });
        } catch (error) {
            result.status = 500;
            result.rols = null;
            result.error = error;
        }
        res.render('update', { result: result });
    },
    postUpdateUser: async(req, res) => {

        try {
            const id = req.params.user;
            let data = req.body;

            const userNick = await User.findOne({ nick: data.nick });

            if (user) {
                throw `El nick ${data.nick} ya esta en uso!`;
            }

            const user = new User({
                nick: data.nick,
                nombre: data.name,
                apellidos: data.lastName,
                password: data.password,
                correo: data.correo,
            });
            let nUser = await User.findOneAndUpdate({ _id: id }, user);
            result.status = 200;
            result.user = nUser;
        } catch (error) {
            result.status = 500;
            result.user = null;
            result.error = error;
        }
        res.render('update', { result: result });
    },
    deleteUser: async(req, res) => {
        try {
            const id = req.params.user;
            await User.deleteOne({ _id: id });
        } catch (error) {

        }
        res.render('index', { result: result });
    }
};