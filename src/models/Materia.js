const mongoose = require("mongoose");
const { Schema } = mongoose;

const MateriaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fotografia: { type: String, required: true },
});

module.exports = mongoose.model("Materia", MateriaSchema);
