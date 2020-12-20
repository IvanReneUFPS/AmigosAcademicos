const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    codigo: { type: Number, unique: true, sparse: true },
    correo: { type: String, unique: true, sparse: true },
    descripcion: { type: String, required: false },
    foto: { default: "/images/userDefault.jpg", type: String, required: false },
    githubId: { type: Number, unique: true, sparse: true },
    materias: [{ type: Schema.ObjectId, ref: "Materia" }],
    nombres: { type: String, required: false },
    password: { type: String, required: false },
    rol: {
        default: "Estudiante",
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
