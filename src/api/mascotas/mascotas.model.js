const mongoose = require('mongoose')

const MascotaSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    photo: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: false }
}, { timestamps: true, collection: 'info'})

const Mascota = mongoose.model('mascota', MascotaSchema)
module.exports = Mascota