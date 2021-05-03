import React, { useRef } from "react";
import MapCanvas from "./MapCanvas";
import { useEffect, useState } from "react";

const MainParent = (props) => {
  const [drawing, setDrawing] = useState(false);
  const clickAction = () => {
    fetch("http://localhost:5000/pdal?wkt=marro", {
      method: "GET",
      /*headers: {
        "Content-Type": "application/json",
      },*/
    })
      .then((res) => res.json())
      .then((resjson) => console.log(resjson));
  };
  const toggleDrawing = () => {
    drawing ? setDrawing(false) : setDrawing(true);
  };

  return (
    <React.Fragment>
      <div>
        <h1>
          KLick this <button onClick={clickAction}>This</button>
        </h1>
        <MapCanvas />
      </div>
    </React.Fragment>
  );
};

export default MainParent;
