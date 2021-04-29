import React, { useRef } from "react";
import MapCanvas from "./MapCanvas";
import { useEffect, useState } from "react";
import { useMap, useMapEvents, Polygon } from "react-leaflet";

const PolyDrawer = (props) => {
  const [polygon, setPolygon] = useState([]);
  const purpleOptions = { color: "purple" };

  const map = useMapEvents({
    click(e) {
      if (props.drawing)
        setPolygon((prevPoly) => [...prevPoly, [e.latlng.lat, e.latlng.lng]]);
      //console.log(polygon);
    },
  });
  return <Polygon pathOptions={purpleOptions} positions={polygon} />;
};

export default PolyDrawer;
