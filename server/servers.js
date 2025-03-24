import cluster from "cluster";
import http from "http";
import { Server } from "socket.io";
import { cpus } from "os";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = http.createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  setupPrimary();

  httpServer.listen(3000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5174",
    },
  });

  io.adapter(createAdapter());

  setupWorker(io);

  io.on("connection", (socket) => {
    console.log(`Someone connected on worker ${process.pid}`);

    socket.emit("welcome", "Welcome!!!");
  });
}
