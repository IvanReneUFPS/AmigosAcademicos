const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    contenido: { type: String, required: true },
    fecha: {
        type: Date,
        default: Date.now,
    },
    fotografia: {
        type: String,
        required: false,
    },
    materia: new Schema({
        nombre: "string",
        _id: Schema.ObjectId,
    }),
    respuestas: [{ type: Schema.ObjectId, ref: "Respuesta" }],
    titulo: { type: String, required: true },
    usuario: new Schema({
        nombres: "string",
        foto: "string",
        _id: Schema.ObjectId,
    }),
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
