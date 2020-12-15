const mongoose = require("mongoose");
const { Schema } = mongoose;
const Usuario = mongoose.model("Usuario");

const ChatSchema = new Schema({
    emisor: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    mensaje: {
        fecha: {
            type: Date,
            dafault: Date.now,
        },
        texto: { type: String, required: true },
    },
    usuarios: [
        {
            usuario: {
                type: Schema.Types.ObjectId,
                ref: "Usuario",
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("Chat", ChatSchema);
