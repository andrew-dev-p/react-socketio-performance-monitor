const socketMain = (io) => {
  io.on("connection", (socket) => {
    const auth = socket.handshake.auth;
    console.log(auth.token);

    if (auth.token === "some-token") {
      socket.join("nodeClient");
    } else if (auth.token === "some-other-token") {
      socket.join("react-client");
    } else {
      socket.disconnect();
      console.log("Disconnected");
    }

    console.log(`Someone connected on worker ${process.pid}`);
    socket.emit("welcome", "Welcome!!!");

    socket.on("performanceData", (data) => {
      console.log("Tick...");
      console.log(data);

      io.to("react-client").emit("performanceData", data);
    });
  });
};

export default socketMain;
