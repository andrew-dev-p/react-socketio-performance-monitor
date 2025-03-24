import { useEffect, useState } from "react";
import socket from "./lib/socketConnection";
import Widget from "./components/Widget/Widget";
import { WidgetData } from "./types";

interface PerformanceData {
  [key: string]: WidgetData;
}

const App = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});

  useEffect(() => {
    socket.on("performanceData", (data) => {
      setPerformanceData((prevData) => ({
        ...prevData,
        [data.macA]: data,
      }));
    });

    return () => {
      socket.off("performanceData");
    };
  }, []);

  const widgets = Object.values(performanceData).map((d) => (
    <Widget data={d} key={d.macA} />
  ));

  return <div className="container">{widgets}</div>;
};

export default App;
