import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  ZoomControl,
  useMap,
  Marker,
  CircleMarker,
  Popup,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactLeafletRaster from "./ReactLeafletRaster";
import PolyDrawer, { PrzykladButton } from "./PolyDrawer";
import { ArrayToWKT } from "./../utils/conversions";

let icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const DEFAULT_VIEWPORT = {
  center: [49.56719379821744, 20.622797012329105],
  zoom: 17,
};

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      zoom: "",
      center: [49.56319379821744, 20.635797012329105],
      polygon: [],
      url: "",
    };
  }

  updatePolygon(dataFromChild) {
    this.setState({
      polygon: dataFromChild,
    });
  }
  //just receive the polygon and send it to api
  componentDidUpdate(prevProps, prevState) {
    if (prevState.polygon !== this.state.polygon) {
      console.log(this.state.polygon);
      let wkt = ArrayToWKT(this.state.polygon);
      let url = new URL("http://localhost:5000/pdal");
      url.search = new URLSearchParams({
        wkt: wkt,
      });
      fetch(url, {
        method: "GET",
        /*headers: {
          "Content-Type": "application/json",
        },*/
      })
        .then((res) => res.json())
        .then((resjson) =>
          this.setState({ url: "http://127.0.0.1:5500/" + resjson.url })
        );
    }
  }

  render() {
    return (
      <React.Fragment>
        <MapContainer
          id="map"
          center={this.state.center}
          zoom={DEFAULT_VIEWPORT.zoom}
          style={{ height: "80vh" }}
        >
          <LayerGroup>
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="osm" checked={true}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxNativeZoom="19"
                  maxZoom="19"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </LayerGroup>
          <PolyDrawer update={this.updatePolygon.bind(this)} />
          <ReactLeafletRaster url={this.state.url} />
        </MapContainer>
      </React.Fragment>
    );
  }
}

export default MapCanvas;
