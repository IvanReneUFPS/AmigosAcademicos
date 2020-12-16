const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    codigo: { type: Number, required: false, unique: true },
    correo: { type: String, required: false, unique: true },
    descripcion: { type: String, required: false },
    foto: { type: String, required: false },
    githubId: { type: Number, required: true, unique: true },
    materias: [{ type: Schema.ObjectId, ref: "Materia" }],
    nombres: { type: String, required: false },
    rol: {
        default: "Estudiante",
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
