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
import PolyDrawer from "./PolyDrawer";

let icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const DEFAULT_VIEWPORT = {
  center: [19.93658, 50.06143],
  zoom: 13,
};

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      zoom: "",
      center: [50.06143, 19.93658],
    };
  }

  render() {
    return (
      <React.Fragment>
        <MapContainer
          id="map"
          center={this.state.center}
          zoom={DEFAULT_VIEWPORT.zoom}
          style={{ height: "100vh" }}
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
          <PolyDrawer drawing={this.props.drawing} />
        </MapContainer>
      </React.Fragment>
    );
  }
}

export default MapCanvas;
