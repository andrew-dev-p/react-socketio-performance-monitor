import os from "os";
import { io } from "socket.io-client";

const options = {
  auth: {
    token: "some-token",
  },
};

const socket = io("http://localhost:3000", options);

socket.on("connect", () => {
  const networkInterfaces = os.networkInterfaces();

  let macA;

  for (let key in networkInterfaces) {
    const currentNetworkInterface = networkInterfaces[key][0];

    const isInternetFacing = !currentNetworkInterface.internal;

    if (isInternetFacing) {
      macA = currentNetworkInterface.mac;
    }
  }

  const performanceDataInterval = setInterval(async () => {
    const performanceData = await performanceLoadData();

    performanceData.macA = macA;

    socket.emit("performanceData", performanceData);
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(performanceDataInterval);
  });
});

const cpuAvg = () => {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    const coreMs = Object.values(core.times).reduce((ms, sum) => ms + sum, 0);

    totalMs += coreMs;
    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () =>
  new Promise((resolve, reject) => {
    const start = cpuAvg();
    setTimeout(() => {
      const end = cpuAvg();

      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;

      const percentageOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);

      resolve(percentageOfCpu);
    }, 100);
  });

const performanceLoadData = () =>
  new Promise(async (resolve, reject) => {
    const osType = os.type();

    const upTime = os.uptime();

    const totalMem = os.totalmem();

    const freeMem = os.freemem();

    const usedMem = totalMem - freeMem;
    const memUsage = 1 - Math.floor((usedMem / totalMem) * 100) / 100;

    const cpus = os.cpus();
    const cpuType = cpus[0].model;
    const cpuCoresCount = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad(cpus);

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuType,
      cpuCoresCount,
      cpuSpeed,
      cpuLoad,
    });
  });
