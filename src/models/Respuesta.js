const mongoose = require("mongoose");
const { Schema } = mongoose;

const RespuestaSchema = new Schema({
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
    respuestas: [{ type: Schema.ObjectId, ref: "Respuesta" }],
    usuario: { type: Schema.ObjectId, ref: "Usuario" },
    votosPositivos: {
        type: Number,
        default: 0,
    },
    votosNegativos: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Respuesta", RespuestaSchema);
