import React, { useRef } from "react";
import MapCanvas from "./MapCanvas";
import { useEffect, useState } from "react";
import { useMap, useMapEvents, Polygon, useMapEvent } from "react-leaflet";
import L from "leaflet";
import { useLeaflet } from "react-leaflet";

const PolyDrawer = (props) => {
  const map = useMap();

  const [polygon, setPolygon] = useState([]);
  const [active, setActive] = useState(false);
  //let active = false;
  const purpleOptions = { color: "purple" };
  useEffect(() => {
    drawingControl.addTo(map);
  }, [map]);
  const mapEvs = useMapEvents({
    click(e) {
      if (e.originalEvent.target.id === "map") {
        if (active)
          setPolygon((prevPoly) => [...prevPoly, [e.latlng.lat, e.latlng.lng]]);
        else {
        }
      } else if (e.originalEvent.target.id === "drawing button") {
        setActive(!active);
      } else if (e.originalEvent.target.id === "drawing button") {
        setActive(!active);
      } else if (e.originalEvent.target.id == "abort") {
        setPolygon([]);
      } else if (e.originalEvent.target.id == "submit") {
        props.update(polygon);
      }
      //console.log("drawing button clicked");
    },
    onMapLoad(e) {
      console.log(e);
    },
  });
  const submitDrawing = L.control({ position: "bottomright" });
  submitDrawing.onAdd = () => {
    const but = L.DomUtil.create("button");
    but.id = "submit";
    but.innerHTML = "submit";
    return but;
  };
  const abortDrawing = L.control({ position: "bottomright" });
  abortDrawing.onAdd = () => {
    const but = L.DomUtil.create("button");
    but.id = "abort";
    but.innerHTML = "abort";
    return but;
  };
  const drawingControl = L.control({ position: "bottomright" });
  drawingControl.onAdd = () => {
    const but = L.DomUtil.create("button");
    but.innerHTML = "activate drawing";
    but.id = "drawing button";
    let activeEdit = false;
    but.onclick = function () {
      if (!activeEdit) {
        activeEdit = true;
        submitDrawing.addTo(map);
        abortDrawing.addTo(map);
        but.innerHTML = "deactivate drawing";
      } else if (activeEdit) {
        activeEdit = false;
        //console.log("clicked on active");
        submitDrawing.remove();
        abortDrawing.remove();
        but.innerHTML = "activate drawing";
      }
    };
    return but;
  };

  return (
    <div>
      <Polygon pathOptions={purpleOptions} positions={polygon} />
    </div>
  );
};

export default PolyDrawer;
