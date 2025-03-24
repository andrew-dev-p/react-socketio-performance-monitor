import { useEffect, useState } from "react";
import Cpu from "../Cpu";
import Mem from "../Mem";
import Info from "../Info";
import "./Widget.css";
import socket from "../../lib/socketConnection";
import { WidgetData } from "../../types";

const Widget = ({ data }: { data: WidgetData }) => {
  const [isAlive, setIsAlive] = useState(true);

  const {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    macA,
  } = data;

  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUsage };
  const infoData = { macA, osType, upTime, cpuType, cpuSpeed, numCores };

  const notAliveDiv = !isAlive ? (
    <div className="not-active">Offline</div>
  ) : (
    <></>
  );

  useEffect(() => {
    socket.on("connectedOrNot", ({ isAlive, machineMacA }) => {
      if (machineMacA === macA) {
        setIsAlive(isAlive);
      }
    });
  }, [macA]);

  return (
    <div className="widget row justify-content-evenly">
      {notAliveDiv}
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={infoData} />
    </div>
  );
};

export default Widget;
