import React from "react";
import "../../App.css";
import useMousePosition from "../../hooks/useMousePosition";

const DotRing = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        id="ring"
      ></div>
      <div
        id="dot"
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;