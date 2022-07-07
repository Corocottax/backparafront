const UserRoutes = require('express').Router();
const { postNewUser, loginUser, logoutUser, getUser, patchUser, deleteUser, getUsers } = require('./users.controller');
const { isAuth } = require("../../middlewares/auth");
const upload = require('../../middlewares/file');

UserRoutes.post('/', upload.single("photo"), postNewUser);
UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', logoutUser);
UserRoutes.get('/', [isAuth], getUsers);
UserRoutes.get('/:id', [isAuth], getUser);
UserRoutes.patch('/:id', [isAuth], upload.single("photo"), patchUser);
UserRoutes.delete('/:id', [isAuth], deleteUser);

module.exports = UserRoutes;