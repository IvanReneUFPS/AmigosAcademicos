const Chat = require("../models/Chat");

module.exports = function (io) {
    let users = {};
    io.on("connection", async (socket) => {
        let messages = await Chat.find({});
        socket.emit("load old msgs", messages);

        socket.on("send message", async (data, cb) => {
            var msg = data.trim();
            var newMsg = new Chat({
                msg,
                nick: socket.nickname,
            });
            await newMsg.save();

            io.sockets.emit("new message", {
                msg: data,
                nick: socket.nickname,
            });
        });

        socket.on("new user", (data, cb) => {
            if (data in users) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNickNames();
                io.sockets.emit("userconneted", socket.nickname);
            }
        });

        socket.on("disconnect", (data) => {
            if (!socket.nickname) return;
            delete users[socket.nickname];
            updateNickNames();
            io.sockets.emit("userdisconnect", socket.nickname);
        });

        function updateNickNames() {
            io.sockets.emit("usernames", Object.keys(users));
        }
    });
};
