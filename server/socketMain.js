const socketMain = (io) => {
  io.on("connection", (socket) => {
    const auth = socket.handshake.auth;

    if (auth.token === "some-token") {
      socket.join("nodeClient");
    } else if (auth.token === "some-other-token") {
      socket.join("react-client");
    } else {
      socket.disconnect();
    }

    socket.on("performanceData", (data) => {
      io.to("react-client").emit("performanceData", data);
    });
  });
};

export default socketMain;
