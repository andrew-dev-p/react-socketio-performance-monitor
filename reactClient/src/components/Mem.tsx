import { useRef } from "react";
import drawCircle from "../lib/canvasLoadAnimation";
import { WidgetData } from "../types";

const Mem = ({
  data,
}: {
  data: Pick<WidgetData, "freeMem" | "memUsage" | "totalMem">;
}) => {
  const { freeMem, memUsage, totalMem } = data;

  const memRef = useRef<HTMLCanvasElement>(null);

  const totalMemInGB = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((freeMem / 1073741824) * 100) / 100;
  if (memRef.current) {
    drawCircle(memRef.current, memUsage * 100);
  }

  return (
    <div className="mem col-3">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas ref={memRef} width="200" height="200"></canvas>
        <div className="mem-text">{memUsage * 100}%</div>
      </div>
      <div>Total Memory: {totalMemInGB}gb</div>
      <div>Free Memory: {freeMemInGB}gb</div>
    </div>
  );
};

export default Mem;
