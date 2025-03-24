import os from "os";

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

const performaceLoadData = () =>
  new Promise(async (resolve, reject) => {
    const osType = os.type();

    const upTime = os.uptime();

    const totalMem = os.totalmem();

    const freeMem = os.freemem();

    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor(usedMem.totalMem * 100) / 100;

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

const run = async () => {
  const data = await performaceLoadData();

  console.log(data);
};

run();
