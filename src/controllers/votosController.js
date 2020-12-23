const Post = require("../models/Post");

module.exports = {
    votarPositivo: async (req, res) => {
        const id_pregunta = req.params.id;
        const pregunta = await Post.findById(id_pregunta);
        if (pregunta && req.user) {
            if (
                !pregunta.votantesPositivos.find((el) => {
                    console.log(el == req.user._id);
                    return el == req.user._id;
                })
            ) {
                pregunta.votantesPositivos.push(req.user._id);
                if (
                    pregunta.votantesNegativos.find((el) => {
                        console.log(el == req.user._id);
                        return el == req.user._id;
                    })
                ) {
                    pregunta.votantesNegativos.splice(req.user._id, 1);
                }
            }
            pregunta.votosNegativos = pregunta.votantesNegativos.length;
            pregunta.votosPositivos = pregunta.votantesPositivos.length;
            await pregunta.save().then((pregunta) => {
                return res.json({
                    positivos: pregunta.votosPositivos,
                    negativos: pregunta.votosNegativos,
                    meGusta: true,
                });
            });
        }
    },
    votarNegativo: async (req, res) => {
        const id_pregunta = req.params.id;
        const pregunta = await Post.findById(id_pregunta);
        if (pregunta && req.user) {
            if (
                !pregunta.votantesNegativos.find((el) => {
                    console.log(el == req.user._id);
                    return el == req.user._id;
                })
            ) {
                pregunta.votantesNegativos.push(req.user._id);
                if (
                    pregunta.votantesPositivos.find((el) => {
                        console.log(el == req.user._id);
                        return el == req.user._id;
                    })
                ) {
                    pregunta.votantesPositivos.splice(req.user._id, 1);
                }
            }
            pregunta.votosNegativos = pregunta.votantesNegativos.length;
            pregunta.votosPositivos = pregunta.votantesPositivos.length;
            await pregunta.save().then((pregunta) => {
                return res.json({
                    positivos: pregunta.votosPositivos,
                    negativos: pregunta.votosNegativos,
                    meGusta: false,
                });
            });
        }
    },
};
