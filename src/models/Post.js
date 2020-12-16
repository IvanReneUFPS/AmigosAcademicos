const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    contenido: { type: String, required: true },
    fecha: {
        type: Date,
        dafault: Date.now,
    },
    fotos: [
        {
            url: String,
        },
    ],
    materia: { type: Schema.ObjectId, ref: "Materia" },
    respuestas: [{ type: Schema.ObjectId, ref: "Respuesta" }],
    titulo: { type: String, required: true },
    usuario: { type: Schema.ObjectId, ref: "Usuario" },
    votantes: [{ type: Schema.ObjectId, ref: "Usuario" }],
    votosNegativos: {
        type: Number,
        default: 0,
    },
    votosPositivos: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Post", PostSchema);
