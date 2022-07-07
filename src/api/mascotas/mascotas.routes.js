const MascotaRoutes = require('express').Router();
const { postNewMascota, getAllMascota, getMascota, patchMascota, deleteMascota } = require('./mascotas.controller');
const { isAuth }= require("../../middlewares/auth");
const upload = require('../../middlewares/file');

MascotaRoutes.get('/', getAllMascota);
MascotaRoutes.get('/:id', getMascota);
MascotaRoutes.post('/', [isAuth], upload.single("photo"), postNewMascota);
MascotaRoutes.patch('/:id', [isAuth], upload.single("photo"), patchMascota);
MascotaRoutes.delete('/:id', [isAuth], deleteMascota);

module.exports = MascotaRoutes