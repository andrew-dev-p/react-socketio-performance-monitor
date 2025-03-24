import { useEffect, useState, useMemo } from "react";
import socket from "./lib/socketConnection";
import Widget from "./components/Widget/Widget";
import { WidgetData } from "./types";

interface PerformanceData {
  [key: string]: WidgetData;
}

const App = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});
  const performanceMachineData = useMemo<PerformanceData>(() => ({}), []);

  useEffect(() => {
    socket.on("performanceData", (data) => {
      performanceMachineData[data.macA] = data;
    });
  }, [performanceMachineData]);

  useEffect(() => {
    setInterval(() => {
      setPerformanceData(performanceMachineData);
    }, 1000);
  }, [performanceMachineData]);

  const widgets = useMemo(() => {
    return Object.values(performanceData).map((d) => (
      <Widget data={d} key={d.macA} />
    ));
  }, [performanceData]);

  return <div className="container">{widgets}</div>;
};

export default App;
