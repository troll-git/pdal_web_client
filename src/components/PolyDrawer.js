import React, { useRef } from "react";
import MapCanvas from "./MapCanvas";
import { useEffect, useState } from "react";
import { useMap, useMapEvents, Polygon, useMapEvent } from "react-leaflet";
import L from "leaflet";
import { useLeaflet } from "react-leaflet";

export const DrawingControl = (props) => {
  let active = false;
  const map = useMap();
  const submitDrawing = L.control({ position: "bottomright" });
  submitDrawing.onAdd = () => {
    const but = L.DomUtil.create("button");
    but.innerHTML = "submit";
    return but;
  };
  const abortDrawing = L.control({ position: "bottomright" });
  abortDrawing.onAdd = () => {
    const but = L.DomUtil.create("button");
    but.innerHTML = "abort";
    return but;
  };
  const drawingControl = L.control({ position: "bottomright" });
  drawingControl.onAdd = () => {
    const but = L.DomUtil.create("button");
    but.innerHTML = "activate drawing";
    but.onclick = function () {
      if (!active) {
        submitDrawing.addTo(map);
        abortDrawing.addTo(map);
        active = true;
        but.innerHTML = "deactivate drawing";
      } else if (active) {
        submitDrawing.remove();
        abortDrawing.remove();
        active = false;
        but.innerHTML = "activate drawing";
      }
    };
    return but;
  };

  useEffect(() => {
    drawingControl.addTo(map);
  });

  return null;
};

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
      console.log(e.originalEvent.target);
      if (e.originalEvent.target.id === "map") {
        if (active)
          setPolygon((prevPoly) => [...prevPoly, [e.latlng.lat, e.latlng.lng]]);
        else {
        }
      }
      //setPolygon((prevPoly) => [...prevPoly, [e.latlng.lat, e.latlng.lng]]);
      else if (e.originalEvent.target.id === "drawing button") {
        setActive(!active);
        console.log(active);
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
    but.innerHTML = "submit";
    return but;
  };
  const abortDrawing = L.control({ position: "bottomright" });
  abortDrawing.onAdd = () => {
    const but = L.DomUtil.create("button");
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
      //console.log("click button");
      //console.log(active);
      //setActive(Date.now());
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
