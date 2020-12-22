const mongoose = require("mongoose");
const { Schema } = mongoose;

const RespuestaSchema = new Schema({
    contenido: { type: String, required: true },
    fecha: {
        type: Date,
        dafault: Date.now,
    },
    fotografia: {
        type: String,
        required: false,
    },
    usuario: new Schema({
        nombres: "string",
        foto: "string",
        _id: Schema.ObjectId,
    }),
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
