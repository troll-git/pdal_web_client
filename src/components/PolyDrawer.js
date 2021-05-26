import React, { useRef } from "react";
import MapCanvas from "./MapCanvas";
import { useEffect, useState } from "react";
import { useMap, useMapEvents, Polygon, useMapEvent } from "react-leaflet";
import L, { polyline } from "leaflet";
import { useLeaflet } from "react-leaflet";
import { polygon } from "@turf/helpers"
import area from "@turf/area"

const PolyDrawer = (props) => {
  const map = useMap();

  const [poly, setPolygon] = useState([]);
  const [polygonTemp, setPolygonTemp] = useState([]);
  const [coords, setCoords] = useState([]);
  const [active, setActive] = useState(false);
  //let active = false;
  const purpleOptions = { color: "purple" };
  useEffect(() => {
    drawingControl.addTo(map);
  }, [map]);
  useEffect(()=>{
    getArea(poly)
    },[poly])
  const mapEvs = useMapEvents({
    click(e) {
       if (e.originalEvent.target.id === "drawing button") {
        setActive(!active);
      } else if (e.originalEvent.target.id === "drawing button") {
        setActive(!active);
      } else if (e.originalEvent.target.id == "abort") {
        setPolygon([]);
      } else if (e.originalEvent.target.id == "submit") {
        props.update(poly);
      } else {
        if (active){
          setPolygon((prevPoly) => [...prevPoly, ([e.latlng.lat, e.latlng.lng])]); 
        }
      }

      //console.log("drawing button clicked");
    },
    onMapLoad(e) {
      console.log(e);
    },
    mousemove(e){
      if (e) {
        if(active){
          poly.pop()
          setPolygon((prevPoly) => [...prevPoly, ([e.latlng.lat, e.latlng.lng])]); 
        }
      }
    },
    contextmenu(e){
      if(active)setActive(false)
    }
   
  });
  const getArea=(poly)=>{
    let newPoly=[...poly,poly[0]]
    console.log(newPoly.length)
    if(newPoly.length>3){
      let polyg = polygon([[...newPoly]], { name: 'poly1' });
      console.log(polyg)
      let polyArea = area(polyg);
      console.log(polyArea)
    }
    else console.log("not enouth")
    //var polyg = polygon(...newPoly, { name: 'poly1' });
    //console.log(polyg)

  }

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
      <Polygon id="polo" className="dfd" pathOptions={purpleOptions} positions={poly} />
    </div>
  );
};

export default PolyDrawer;
