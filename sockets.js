module.exports = function (io) {
  let broadcasts = {};

  io.on("connection", (socket) => {
    socket.on("broadcaster", (carId) => {
      broadcasts[carId] = socket.id;
      broadcaster = socket.id;
      socket.broadcast.emit("broadcaster");
    });

    socket.on("watcher", (carId) => {
      socket.to(broadcasts[carId]).emit("watcher", socket.id);
    });

    socket.on("offer", (id, message) => {
      socket.to(id).emit("offer", socket.id, message);
    });

    socket.on("answer", (id, message) => {
      socket.to(id).emit("answer", socket.id, message);
    });

    socket.on("candidate", (id, message) => {
      socket.to(id).emit("candidate", socket.id, message);
    });

    socket.on("disconnect", () => {
      var socketId = socket.id;
    });
  });
};
