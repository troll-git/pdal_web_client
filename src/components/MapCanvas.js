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
  zoom: 14,
};

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      zoom: "",
      center: [59.97319379821744, 10.735797012329105],
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
                  attribution='& copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community</a> contributors'
                  attribution="<a href='Kartverkethttp://www.statkart.no/'>Kartverket</a>, <a href='Geoveksthttp://www.statkart.no/nor/Land/Fagomrader/Geovekst/'>Geovekst</a>, <a href='kommunerhttp://www.statkart.no/?module=Articles;action=Article.publicShow;ID=14194'</a>kommuner</a> og <a href='Norsk'>http://www.npolar.no/'>Norsk Polarinstitutt</a>"
                  url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4graatone&zoom={z}&x={x}&y={y}"
                  maxNativeZoom="21"
                  maxZoom="21"
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
