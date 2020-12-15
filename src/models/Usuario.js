const mongoose = require('mongoose')
const {Schema} = mongoose;
const Materia = mongoose.model("Materia");

const UsuarioSchema = new Schema({
    codigo: { type: Number, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    foto: { type: String, required: false },
    materias: [{ type: Schema.ObjectId, ref: "Materia" }],
    nombres: { type: String, required: true },
    rol: {
        default: "Estudiante",
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Usuario',  UsuarioSchema);