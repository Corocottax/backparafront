const Mascota = require("./mascotas.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewMascota = async (req, res, next) => {
  try {
    const newMascota = new Mascota(req.body);
    if (req.file) {
      newMascota.photo = req.file.path;
    }
    console.log("Req.file" + req.file)
    const mascotaDB = await newMascota.save();
    return res.status(201).json(mascotaDB);
  } catch (error) {
    return next(error);
  }
};

const getAllMascota = async (req, res, next) => {
  try {
    const mascotaDB = await Mascota.find();
    return res.status(200).json(mascotaDB);
  } catch (error) {
    return next(setError(404, "Mascota server fail"));
  }
};

const getMascota = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mascotaDB = await Mascota.findById(id);
    if (!mascotaDB) {
      return next(setError(404, "Mascota not found"));
    }
    return res.status(200).json(mascotaDB);
  } catch (error) {
    return next(setError(404, "Mascota server fail"));
  }
};

const patchMascota = async (req, res, next) => {
    try {
      const { id } = req.params;
      const patchMascota = new Mascota(req.body);
      patchMascota._id = id;
      const mascotaDB = await Mascota.findById(id);
      if (req.file) {
        if (mascotaDB.photo) {
          deleteFile(mascotaDB.photo);
        }
        patchMascota.photo = req.file.path;
      }
      const MascotaUpdated = await Mascota.findByIdAndUpdate(id, patchMascota);
      if (!mascotaDB) {
        return next(setError(404, "Mascota not found"));
      }
      return res.status(200).json({ new: patchMascota, old: MascotaUpdated });
    } catch (error) {
      return next(setError(500, "Mascota cant be replaced"));
    }
  };

const deleteMascota = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mascotaDB = await Mascota.findByIdAndDelete(id);
    if (!mascotaDB) {
      return next(setError(404, "Error borrando Mascota"));
    }
    if (mascotaDB.photo) {
      deleteFile(mascotaDB.photo);
    }
    return res.status(200).json(mascotaDB);
  } catch (error) {
    return next(setError(500, "Mascota no se puede borrar"));
  }
};

module.exports = {
  postNewMascota,
  getAllMascota,
  deleteMascota,
  getMascota,
  patchMascota
};