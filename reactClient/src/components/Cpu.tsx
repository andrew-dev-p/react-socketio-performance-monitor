import { useRef } from "react";
import drawCircle from "../lib/canvasLoadAnimation";
import { WidgetData } from "../types";

const Cpu = ({ data }: { data: WidgetData }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  if (canvasEl.current) {
    drawCircle(canvasEl.current, data.cpuLoad);
  }

  return (
    <div className="cpu col-3">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasEl} className="" width="200" height="200"></canvas>
        <div className="cpu-text">{data.cpuLoad}</div>
      </div>
    </div>
  );
};

export default Cpu;
